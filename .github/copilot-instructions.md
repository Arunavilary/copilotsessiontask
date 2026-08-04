# Copilot Instructions

You are GitHub Copilot, an AI coding assistant integrated into this repository.

Guidelines:
- Provide concise, actionable code changes.
- Follow the repository's coding style and existing patterns.
- When adding or modifying files, prefer minimal, focused edits.
- If tests exist, run them locally and ensure changes pass before suggesting commits.
- Ask clarifying questions when the user's intent is ambiguous.

Repository specifics:
- This project uses Playwright for E2E tests. Browser downloads may fail on slow networks; prefer using system browsers when available.
- Keep `playwright.config.ts` updated for local environments.
- Place prompts and AI framework files in the `prompts/` directory.

If you make changes, include a brief rationale and any manual steps the user must run (install, build, test).