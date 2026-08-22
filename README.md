# Skills starter

A minimal, working setup for learning how Claude Code skills work — built to be
edited, not just read.

## Try it

In a session started on this repo, type:

- `/hello-skill` — explains the mechanics against the actual files
- `/explain-changes` — summarizes your uncommitted work (edit a file first)

`/explain-changes` also runs without being asked for by name: say "what did I
change?" and Claude reaches for it on its own.

## What's here

```
.claude/skills/
├── hello-skill/SKILL.md      # user-invoked only, explains itself
└── explain-changes/SKILL.md  # Claude invokes this one automatically too
```

A skill is one directory containing a `SKILL.md`. The **directory name** is the
command: `hello-skill/` → `/hello-skill`. The file is YAML frontmatter, then
markdown instructions addressed to Claude.

Only the `description` stays loaded in context. The body loads when the skill is
actually used — which is why a long skill costs nothing until you need it, and
why the `description` is the field worth fussing over: it's what Claude reads
when deciding whether the skill applies.

## Write your own

```bash
mkdir -p .claude/skills/my-skill
$EDITOR .claude/skills/my-skill/SKILL.md
```

```markdown
---
description: What it does, and when Claude should use it.
---

Instructions addressed to Claude, in plain markdown.
```

Commit it. That's the install — no separate step. Claude Code picks up added and
edited skills mid-session, so `/my-skill` works without a restart.

Frontmatter fields worth knowing early (all optional):

| Field | Use |
| --- | --- |
| `description` | What it does + when to use it. The one field to get right. |
| `disable-model-invocation: true` | Only you can run it, by typing `/name`. |
| `user-invocable: false` | Only Claude can; hidden from the `/` menu. |
| `argument-hint` | Autocomplete hint, e.g. `[issue-number]`. |
| `allowed-tools` | Tools pre-approved for this skill's turn, so it doesn't prompt. |

Full reference: https://code.claude.com/docs/en/skills

## Where skills can live

| Location | Scope | Loads in web/cloud sessions? |
| --- | --- | --- |
| `.claude/skills/` in a repo | that project | **Yes** — the repo is cloned in |
| Enabled on your claude.ai account | everywhere | **Yes** — synced at session start |
| `~/.claude/skills/` on your machine | your local sessions | **No** |

The third row is the common surprise: a skill that lives only on your laptop is
not found in a web or cloud session, or in a scheduled routine, because each one
starts as a fresh remote container. Commit it here, or enable it on your
claude.ai account, and it travels.
