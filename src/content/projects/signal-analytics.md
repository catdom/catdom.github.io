---
title: 'Signal Analytics'
summary: 'Realtime dashboard rendering ~2M points without dropping frames, built on a custom canvas layer.'
year: 2025
role: 'Front-end Architect'
org: 'Placeholder Company'
tags: ['Data viz', 'Canvas', 'Performance']
outcome: '60fps at 2M points'
links:
  live: 'https://example.com/signal'
layout:
  col: 4
  row: 2
  accent: false
order: 2
featured: true
---

<!-- ⚑ PLACEHOLDER CASE STUDY -->

## The problem

The existing SVG-based charts collapsed past roughly 20,000 points. Analysts
routinely wanted to look at a month of second-resolution data.

## Approach

I moved rendering to a canvas layer with a tiled, level-of-detail scheme:
aggregate buckets at low zoom, raw points once the viewport is narrow enough
to warrant them. Interaction stayed in the DOM so keyboard navigation and
screen-reader output remained real rather than simulated.

## Outcome

Sustained 60fps at two million points on a mid-range laptop, with the
accessibility layer intact.
