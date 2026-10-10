# Next.js Neon Template

The TypeScript Next.js starter with Neon Postgres, Neon Auth, and an anonymous mailing list. It is independent of its sibling templates (TypeScript, JavaScript, Docker).

## Language

### Structure

**Library**:
Application logic that renders no UI. It may use server-only framework hooks such as Server Actions and request caching, but never components.
_Avoid_: lib, utils, helpers

**Server Action**:
A Library function that a form submits to in order to change data.
_Avoid_: action handler, endpoint, mutation

**Primitive**:
A generated shadcn UI component, taken as-is from the registry rather than written by hand.
_Avoid_: ui component, atom

**Block**:
A component composed from Primitives to provide one self-contained piece of UI.
_Avoid_: widget, composite

**Providers**:
The single client-side root that holds every app-wide context.
_Avoid_: theme provider, wrapper

### People

**User**:
Someone with an account, signed in through Neon Auth.
_Avoid_: account, customer, member

**Subscriber**:
An email address that asked to join the mailing list, with no account attached. Subscribing is anonymous: the response never reveals whether an address was already on the list.
_Avoid_: member, contact, lead

**Confirmed Subscriber**:
A Subscriber who followed the link in their confirmation email. Only Confirmed Subscribers are on the mailing list.
_Avoid_: verified subscriber, active subscriber, opted-in

**Unsubscribed**:
A Subscriber who has left the mailing list. Subscribing and confirming again makes them a Confirmed Subscriber once more.
_Avoid_: opted out, removed, deleted

A User is never automatically a Subscriber, and a Subscriber is never automatically a User.

**Protected route**:
A page that only a signed-in User can view.
_Avoid_: private page, guarded route
