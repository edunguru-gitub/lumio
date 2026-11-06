---
name: "skill-router"
description: "Use at the start of any non-trivial task to pick and load the right skill automatically, asking the user only when the choice is unclear or costly."
---

# Skill router

Goal: the user never has to name a skill.

1. Read the request. Match it to the available skills by their descriptions.
2. One clear match: load it with the Skill tool and continue. Do not announce it.
3. Several skills apply: load all of them (e.g. frontend-design + accessibility-audit for a UI task).
4. No match: continue normally. Do not invent skills.
5. Ask the user ONLY if:
   - two skills would give clearly different outputs (e.g. a file vs an artifact), or
   - the skill costs a lot or is hard to undo (large fan-out, publishing, deleting).
   Ask one short question with 2 to 4 options.
6. If a project skill exists (e.g. lumio-map for Lumio work), load it first.

Defaults:
- UI or app code: frontend-design, then design-critique and accessibility-audit before finishing.
- Lumio code: lumio-lean-code. Lumio design or copy: lumio-taste.
- App text: ux-writing.
- Slides, docs, sheets: the matching artifact type; file skills (pptx, docx, xlsx, pdf) only if a file format is requested.
- New video: video-making.
- Research with sources: deep-research.
- Short answers wanted: adhd-mode.

Model and cost (idea from a saved reel about /advisor; I cannot switch models myself, I only suggest):
- Planning, decisions, reviews and design judgement: the strongest model. In Claude Code, /advisor lets the strong model advise while a cheaper one does the work.
- Mechanical work (renders, formatting, repeated edits): a cheaper model is enough.
- If the user keeps hitting the usage limit, say so once and suggest /advisor or a handoff (limit-handoff). Do not repeat it.

Rules: never load a skill just in case. Never narrate the routing. Same language as the user.