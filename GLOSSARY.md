# Next.js TypeScript Template

The base TypeScript Next.js starter that new apps are copied from. It is independent of its sibling templates (JavaScript, Docker).

## Language

**Library**:
Framework-free application logic that does not depend on React or Next.js.
_Avoid_: lib, utils, helpers

**Primitive**:
A generated shadcn UI component, taken as-is from the registry rather than written by hand.
_Avoid_: ui component, atom

**Block**:
A component composed from Primitives to provide one self-contained piece of UI.
_Avoid_: widget, composite

**Providers**:
The single client-side root that holds every app-wide context.
_Avoid_: theme provider, wrapper
