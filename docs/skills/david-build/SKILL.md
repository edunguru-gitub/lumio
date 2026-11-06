---
name: david-build
description: David's build routine for Lumio: smallest patch, state safety, self-check before reporting.
---
1. Read the spec (designer) and only the code sections touched.
2. Patch, never rewrite. Keep state/localStorage keys and function names.
3. Follow docs/skills/lumio-lean-code checklist.
4. Run the page headless (Playwright), zero console errors.
5. Report: files, what changed, how to verify. No more.
