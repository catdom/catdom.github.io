---
name: commit
description: Write a commit message from the actual diff and commit the staged work. Use when the user wants to commit, save, or check in their changes, or asks for help wording a commit message.
argument-hint: [optional note about intent]
allowed-tools: Bash(git status:*) Bash(git diff:*) Bash(git log:*) Bash(git commit:*)
---

# Commit the current work

Staged:

```!
git diff --cached --stat
```

Unstaged and untracked:

```!
git status --short
```

Recent messages, to match the repo's existing style:

```!
git log --oneline -10
```

## What to do

Read the full staged diff with `git diff --cached` before writing anything. The
message describes what the diff actually does, not what $1 says it does — treat
any note the user passed as intent to confirm against the code, not as the
message itself.

**If nothing is staged**, don't stage everything blindly. Look at what's
changed, and either stage the files that clearly belong to one logical change
and say which ones you picked, or — if the changes look like two or more
unrelated things — show the user the groups you see and ask which to commit
first. Never commit a file whose changes you haven't read.

**Write the message** in the style the log above already uses. If the repo has
no clear convention yet, use: a short imperative subject line under ~70
characters, then a blank line, then a body only when the change needs one.

The body earns its place by explaining *why* — the constraint, the bug, the
decision. Skip it entirely for changes whose subject line says everything. Never
pad it by restating the diff as prose.

Never include a model name, an assistant name, or session metadata in the
message.

**Then commit.** Do not push — pushing is the user's call, and this repo pushes
to a named branch. Report the subject line you used and what's still uncommitted.
