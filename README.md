# Spark Automation

AI-powered missed-call, follow-up, and reactivation systems for local service businesses — pressure washing, plumbing, electricians, handyman, HVAC, landscaping, and more.

**Live site:** https://spark-automation-site.vercel.app

## What's in this repo

- `index.html`, `style.css`, `script.js` — the marketing site, including a live ROI calculator and an ignition-themed brand animation
- `contact.html` — dedicated contact page with a working Formspree-backed form
- `/workflow` — a sanitized export of the real n8n automation behind the case study (see its own README for details)

## How this was built

This was built in close collaboration with Claude. Some of it — scaffolding the site, writing the n8n workflow's 24 nodes, tracking down a dead webhook tunnel — was handed off entirely; the brand direction, copy tone, and business calls like pricing and which niches to target stayed human. The clearer the direction, the better what came back — vague asks produced generic results, specific ones didn't. And nothing here was taken at face value: a live call test looked like it should have worked and didn't, and it took tracing it through real execution logs, not just trusting "no errors shown," to actually find the bug. Every change was checked against something real before it was called done.

## The automation

The core automation — missed call → 30-second wait → dedupe → GHL contact/opportunity update → SMS — is documented in [`/workflow`](./workflow).
