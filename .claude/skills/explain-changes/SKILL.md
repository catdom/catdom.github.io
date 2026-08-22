---
name: explain-changes
description: Summarize the uncommitted changes in the working tree in plain language — what changed, why it likely changed, and anything that looks unintended. Use when the user asks what changed, what they were working on, or to review their work in progress before committing.
allowed-tools: Bash(git status:*) Bash(git diff:*)
---

# Explain the working-tree changes

Current status:

```!
git status --short
```

Read the full diff with `git diff` (and `git diff --cached` if anything is
staged), then write a summary for the user with three parts:

**What changed** — one bullet per file or logical group, in plain language.
Describe the behavior that changed, not the syntax. "Retries failed uploads
three times" beats "added a for loop in upload()".

**Why, probably** — your read of the intent behind the change, as a sentence or
two. Say so plainly if the intent isn't clear from the diff.

**Worth a look** — anything that seems unintended: a debug print left in, a
commented-out block, a file that looks unrelated to the rest of the change, a
TODO added and not resolved. Omit this section entirely if nothing stands out;
do not invent concerns to fill it.

If the working tree is clean, say so in one line and stop.
