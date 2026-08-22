---
name: hello-skill
description: Walkthrough of how skills work in this repo. Invoke with /hello-skill to see the mechanics explained against this actual file.
disable-model-invocation: true
---

# You just ran a skill

Everything below this frontmatter was loaded into your context the moment the
user typed `/hello-skill`. Before that, only the `description` line was loaded.
That is the whole idea: a skill costs almost nothing until it is used.

Explain to the user what just happened, in your own words, covering these points
and nothing more. Keep it short — six sentences at most.

1. This file lives at `.claude/skills/hello-skill/SKILL.md`. The **directory
   name** is what they type: `hello-skill` → `/hello-skill`.
2. It is a **project skill** — committed to this repository. Cloud and web
   sessions clone the repo, so it loads here with no install step. It also
   loads for anyone else who clones the repo.
3. The frontmatter here sets `disable-model-invocation: true`, which means
   Claude never loads this skill on its own — only the user can, by typing the
   command. Point them at `.claude/skills/explain-changes/SKILL.md` as the
   opposite case: no such field, so Claude reaches for it on its own when the
   description matches what the user asked for.
4. To make their own: copy either directory, rename it, rewrite the
   `description`, and write the body as instructions addressed to Claude.
   Committing it is the install.

Then ask what they'd like a skill for, and offer to write it.
