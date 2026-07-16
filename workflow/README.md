# Missed Call Text-Back — n8n Workflow

The real automation behind the pressure-washing case study on [spark-automation-site.vercel.app](https://spark-automation-site.vercel.app). 24 nodes, built and tested in n8n against a real phone number.

**What it does:** a missed call triggers a webhook, waits 30 seconds for a real callback window, dedupes repeat callers, looks up or creates the GHL contact, sends the right message to a new lead vs. a returning customer, creates/updates the pipeline opportunity, and logs failures for manual follow-up instead of failing silently.

## About this export

Account-specific identifiers (GHL location ID, pipeline ID, stage ID, credential reference, and stored phone numbers) have been replaced with placeholders before publishing here. The real workflow runs on a private n8n instance against a live GoHighLevel account — this file is for showing the logic and structure, not for re-importing and running as-is.

To run it for real, you'd need your own GHL account, your own credential set up in n8n, and your own pipeline/stage IDs swapped back in.

## Diligence, not just "it ran"

This workflow went through two real failures before being called done: a wrong field path silently rejected every real call, and later a dead webhook tunnel did the same. Both were only caught by tracing a live phone call through n8n's execution history and GHL's execution logs — not by trusting that "no visible errors" meant it worked.
