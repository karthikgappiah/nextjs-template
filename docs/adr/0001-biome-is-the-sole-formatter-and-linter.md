# Biome is the sole formatter and linter

Biome handles formatting, linting, Tailwind class sorting, and import organisation. It is enforced in the lefthook pre-commit hook, the VS Code workspace settings, and CI. We chose it over ESLint + Prettier for a single fast tool and accept losing the Next.js-specific rules from `eslint-config-next`. Do not reintroduce ESLint or Prettier alongside it.
