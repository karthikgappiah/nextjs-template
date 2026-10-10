# Spelled-out src layout overriding shadcn defaults

All source lives under `src/`, and the shadcn aliases in `components.json` are overridden to spelled-out paths: `@/library` (not `lib`), `@/styles/utilities` (not `lib/utils`), `@/components/shadcn/ui` for Primitives and `@/components/shadcn/blocks` for Blocks. Every `shadcn add` writes to these aliases, so changing them later means moving generated files and rewriting their imports.
