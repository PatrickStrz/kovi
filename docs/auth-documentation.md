# Authentication

## Kovi auth api:

- **To protect actions within the application** :
 use the `requireAuth` helper in `lib/auth.js` it takes a callback
 (the protected action) that will execute only if the user is
 authenticated, otherwise it will trigger an Auth0Lock login/Register modal to render.
- Users are synced with the graphcool api when a user is created and whenever a user
logs in. This ensures that the graphcool api is synced with facebook data. (I.e has a
users most up to date facebook profile picture).

## Auth flow
- Using Auth0 lock https://auth0.com/docs/libraries/lock/v10
  and Graph.cool server auth0 integration for auth

- Auth0Lock code is in AuthService.js
- An AuthService instance is created in auth-actions.js.
Can trigger lock to render a login/register modal by calling `AuthService.login`
  - A successful login will emit an authenticated event.
- The `checkLogin` function in `auth-actions.js` listens to authenticated event from
`AuthService` and receives the profile of the user from the `auth0 api`.

- The `checkLogin` function sits in the Site component so that a login modal (
out of the box auth0 lock modal component
) can
be triggered to render from any child element.

- Upon a successful login the user will be synced with the graphcool graphql API in the
SyncUser component (which is only rendered if the redux store says that a
user is not synced : `!state.app.auth.userSyncRequired` and the user isAuthenticated:
`state.app.auth.isAuthenticated` ). An `apollo client` `user query` on the `graphcool
api` is performed to check if a user exists.
If the query returns null, a new user will be created in the graph.cool db
using the `auth0` profile data,
otherwise the user will be updated and 'synced' with the graph.cool db.

## Notes
- **Redux state is the Source of truth** (`state.app.auth.isAuthenticated`)
 for knowing if a user is logged in. Authenticated users are both auth0 authenticated
 and synced with the graphcool api (  `state.app.auth.auth0Authenticated` &&
 `!state.app.auth.userSyncRequired`).
- User Authentication states (isAuthenticated, userSynced ...) in the redux store
depend on localStorage to persist these states after refreshes.
**User related LocalStorage items should be completely cleared after logouts.**
- For now only using Facebook social auth.

- Previous application state is not preserved after login.
  The user is redirected to '/' and the page is rerendered.



### Todo:
- Clear out user query from apollo store when not logged in.
