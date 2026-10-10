## Conventional Commits

Always adhere to the [Conventional Commits](https://www.conventionalcommits.org) specification for issues, commits, pull requests, and other change titles (e.g. `feat(scope): summary`, `fix:`, `docs:`, `chore:`).

## Subagents

Always leverage subagents, using the appropriate model and effort for each task, to optimize token efficiency, context windows, and rate limits. Delegate broad searches, research, and multi-step work; keep the main context lean.

## Agent Skills

### Issue Tracker

GitHub Issues in `karthikgappiah/nextjs-template`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage Labels

Default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain Docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
