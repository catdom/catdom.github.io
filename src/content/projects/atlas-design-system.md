---
title: 'Atlas Design System'
summary: 'A token-driven component library adopted across twelve product surfaces, replacing four divergent UI codebases.'
year: 2025
role: 'Lead Design Engineer'
org: 'Placeholder Company'
tags: ['Design systems', 'TypeScript', 'Tokens', 'Accessibility']
outcome: '12 surfaces on one system'
links:
  live: 'https://example.com/atlas'
  repo: 'https://github.com/username/atlas'
layout:
  col: 8
  row: 2
  accent: true
order: 1
featured: true
---

<!-- ⚑ PLACEHOLDER CASE STUDY — replace the body, keep the structure. -->

## The problem

Four product teams had independently grown four button components, three
modal implementations and two competing spacing scales. Every cross-team
feature negotiated visual language from scratch, and accessibility fixes had
to be applied four times.

## Approach

I started from the tokens rather than the components. A three-tier token
system — primitive, semantic, component — meant a theme change touched one
layer and cascaded predictably. Components were then rebuilt against those
semantics, with contrast pairs enforced at build time.

## What shipped

- 48 components, each with visual-regression and axe coverage in CI
- A token pipeline emitting CSS custom properties, Swift and Kotlin
- Codemods that migrated three of the four legacy codebases automatically

## Outcome

Twelve surfaces now consume one system. Accessibility defects in shared UI
dropped substantially, and net UI code across the org went down despite
shipping more features.
