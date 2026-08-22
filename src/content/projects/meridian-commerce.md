---
title: 'Meridian Commerce'
summary: 'Storefront rebuild that halved first contentful paint and lifted mobile conversion.'
year: 2024
role: 'Senior Design Engineer'
org: 'Placeholder Client'
tags: ['Performance', 'Astro', 'E-commerce']
outcome: '48% faster FCP'
links:
  live: 'https://example.com/meridian'
layout:
  col: 4
  row: 2
  accent: false
order: 3
featured: true
---

<!-- ⚑ PLACEHOLDER CASE STUDY -->

## The problem

A React SPA storefront shipping 380KB of JavaScript before rendering a single
product. Mobile users on slow connections were abandoning before first paint.

## Approach

Static generation with islands: the catalogue and product pages became fully
static HTML, and only the cart and search kept client-side JavaScript. Images
moved to AVIF with proper `sizes` attributes. Fonts were subset and self-hosted.

## Outcome

First contentful paint dropped by roughly half; the JS bundle fell by about
80%. Mobile conversion moved in the right direction.
