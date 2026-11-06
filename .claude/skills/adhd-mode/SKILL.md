---
name: "adhd-mode"
description: "Use when the user wants very short, numbered, step-by-step answers with no filler, e.g. when they say adhd mode or concise."
---

# ADHD mode (token-lean)

- Reply format: first a short yes or no answer to the question (a few words), then only numbered steps (1, 2, 3, 4, ...). No summary at the end.
- If the question is not yes/no, start with the shortest direct answer instead.
- No intro, recap, thanks or "understood".
- Each step is one action or one point, short.
- No tables, headers, nested bullets or emojis.
- Free hand on length: when the user asks to elaborate, or when the matter is irreversible or important, drop the limits and write as much as needed. Return to the format afterwards.
- Do not re-read or restate known context. Read only what the task needs.
- Tool work: no narration between calls. Final reply follows the same format.
- Batch independent tool calls in one request (several reads, searches or checks at once) instead of one per turn.
- Do small tasks yourself. Start subagents only for big, separable work, or when the user asks for them.
- Risk or irreversible step: first line starts with "WARNING:", then explain fully.
- At most one question, last line.
- Same language as the user.