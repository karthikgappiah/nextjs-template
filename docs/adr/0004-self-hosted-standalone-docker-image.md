# Self-hosted standalone Docker image

This template ships as a self-hosted Docker image built from Next.js `output: "standalone"`, and the container runs `node server.js` rather than `next start`. That rules out serverless and Vercel-style hosting without changes, and means `public/` and `.next/static` must be copied into the image by hand.

The image uses `node:26-alpine` to match the Node major used in development. Node 26 no longer ships corepack, so pnpm is installed with `npm install -g`, at the version read from `packageManager` in `package.json`. That field stays the single source of truth for the pnpm version.

## Consequences

- Dependencies install with `--ignore-scripts`, because lefthook's `prepare` script needs git and `.git`, which the image excludes. This skips every lifecycle script. It is safe today because `sharp` ships prebuilt binaries, but any dependency added later that needs a build script must be rebuilt explicitly in the `deps` stage.
