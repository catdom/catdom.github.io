---
title: 'Kern'
summary: 'A browser tool for inspecting variable-font axes and exporting production-ready type ramps.'
year: 2024
role: 'Designer & Developer'
org: 'Personal'
tags: ['Typography', 'Tooling', 'Open source']
outcome: '4k+ monthly users'
links:
  live: 'https://example.com/kern'
  repo: 'https://github.com/username/kern'
layout:
  col: 8
  row: 2
  accent: false
order: 4
featured: true
---

<!-- ⚑ PLACEHOLDER CASE STUDY -->

## Why

Variable fonts expose axes that most tooling ignores. Picking an optical size
or a width value usually means guessing, then eyeballing the result in a
browser tab.

## What it does

Kern loads any local or remote variable font, exposes every registered and
custom axis as a live control, and emits a fluid `clamp()` type ramp as CSS
custom properties — the same ramp powering this site.

## Notes

Entirely client-side. Fonts you load never leave your machine.
