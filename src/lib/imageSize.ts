import { openSync, readSync, closeSync } from 'node:fs';

export type Size = { width: number; height: number };

/**
 * Reads the pixel dimensions out of an image header at build time, so the
 * markup can carry width/height and the page stops reflowing as images load.
 *
 * Header-only: it reads the first few hundred bytes rather than decoding, and
 * returns undefined for anything it does not recognise — a missing size just
 * means the attributes are left off, never a broken build.
 */
export const imageSize = (path: string): Size | undefined => {
  let fd: number;
  try {
    fd = openSync(path, 'r');
  } catch {
    return undefined;
  }

  try {
    const head = Buffer.alloc(512);
    const read = readSync(fd, head, 0, 512, 0);
    const buf = head.subarray(0, read);

    return png(buf) ?? webp(buf) ?? gif(buf) ?? avif(buf) ?? jpeg(fd, buf);
  } catch {
    return undefined;
  } finally {
    closeSync(fd);
  }
};

const png = (b: Buffer): Size | undefined => {
  if (b.length < 24) return undefined;
  if (b.readUInt32BE(0) !== 0x89504e47) return undefined;
  // IHDR is always the first chunk, so the size sits at a fixed offset.
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
};

const webp = (b: Buffer): Size | undefined => {
  if (b.length < 30) return undefined;
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') {
    return undefined;
  }

  const chunk = b.toString('ascii', 12, 16);

  // Lossy: 14-bit dimensions after the start code in the VP8 frame header.
  if (chunk === 'VP8 ') {
    return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  }

  // Lossless: 14 bits each, packed across four bytes, both stored minus one.
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }

  // Extended: 24-bit canvas size, again stored minus one.
  if (chunk === 'VP8X') {
    const at = (o: number) => b[o] | (b[o + 1] << 8) | (b[o + 2] << 16);
    return { width: at(24) + 1, height: at(27) + 1 };
  }

  return undefined;
};

const gif = (b: Buffer): Size | undefined => {
  if (b.length < 10 || b.toString('ascii', 0, 3) !== 'GIF') return undefined;
  return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
};

const avif = (b: Buffer): Size | undefined => {
  if (b.length < 16 || b.toString('ascii', 4, 8) !== 'ftyp') return undefined;
  // The spatial-extents box carries the canvas size; find it rather than
  // walking the whole ISOBMFF box tree.
  const at = b.indexOf('ispe', 0, 'ascii');
  if (at === -1 || at + 16 > b.length) return undefined;
  return { width: b.readUInt32BE(at + 8), height: b.readUInt32BE(at + 12) };
};

const jpeg = (fd: number, head: Buffer): Size | undefined => {
  if (head.length < 4 || head.readUInt16BE(0) !== 0xffd8) return undefined;

  // Segments can push the frame header past any fixed window, so walk them.
  const seg = Buffer.alloc(9);
  let at = 2;

  for (let guard = 0; guard < 256; guard++) {
    if (readSync(fd, seg, 0, 9, at) < 9) return undefined;
    if (seg[0] !== 0xff) return undefined;

    const marker = seg[1];
    // SOF0-SOF15, skipping the four that are not frame headers.
    const isFrame =
      marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc, 0xd8].includes(marker);

    if (isFrame) return { width: seg.readUInt16BE(7), height: seg.readUInt16BE(5) };

    at += 2 + seg.readUInt16BE(2);
  }

  return undefined;
};
