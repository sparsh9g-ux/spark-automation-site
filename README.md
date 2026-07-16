# Spark Automation

AI-powered missed-call, follow-up, and reactivation systems for local service businesses — pressure washing, plumbing, electricians, handyman, HVAC, landscaping, and more.

**Live site:** https://spark-automation-site.vercel.app

## What's in this repo

- `index.html`, `style.css`, `script.js` — the marketing site, including a live ROI calculator and an ignition-themed brand animation
- `contact.html` — dedicated contact page with a working Formspree-backed form
- `/workflow` — a sanitized export of the real n8n automation behind the case study (see its own README for details)

## How this was built

This was built in close collaboration with Claude, and the process mapped closely onto Anthropic's own AI Fluency framework:

- **Delegation** — deciding what to hand to Claude (scaffolding the site, building the n8n workflow's 24 nodes, debugging a dead webhook tunnel) versus what needed a human call (brand direction, copy tone, which niches to target, pricing).
- **Description** — the clearer the ask, the better the output. Vague direction like "make it look good" produced generic results; specific direction ("electric, not warm-glow; snappy `back.out` easing, not slow fades") produced the actual site.
- **Discernment** — not accepting outputs at face value. A live call test looked like it should have worked and didn't; tracing it through GHL's execution logs surfaced the real bug (a dead webhook tunnel), not the first theory that seemed obvious.
- **Diligence** — verifying before trusting. Every change here was checked against a real phone call and real execution logs — not just "no errors shown" — before being called done.

## The automation

The core automation — missed call → 30-second wait → dedupe → GHL contact/opportunity update → SMS — is documented in [`/workflow`](./workflow).
