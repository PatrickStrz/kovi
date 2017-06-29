


## Kovi auth api:

- **To protect actions within the application** :
 use the `requireAuth` helper in `lib/auth.js` it takes a callback
 (the protected action) that will execute only if the user is
 authenticated, otherwise it will trigger an Auth0Lock login/Register modal to render.
- Users are synced with the graphcool api when a user is created and whenever a user
logs in. This ensures that the graphcool api is synced with facebook data. (I.e has a
users most up to date facebook profile picture).
- **To trigger a user sync**, dispatch a `syncRequired` action.
Notes
: Redux **state is the Source of truth**
 for knowing if a user is logged in. A user must be auth0 authenticated
 and synced with the graphcool api to be able to perform any auth protected
 actions.  Both `state.app.auth.userSynced` and `state.app.auth.isAuthenticated`
 redux states must be true for a user to be considered logged in.



- Previous application state is not preserved after login.
  The user is redirected to '/' and the page is rerendered.

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
user is not synced : `state.app.auth.userSynced:false` and the user isAuthenticated:
`state.app.auth.isAuthenticated` ). An `apollo client` `user query` on the `graphcool
api` is performed to check if a user exists.
If the query returns null user, a new user will be created in the graph.cool db
using the `auth0` profile data,
otherwise the user will be updated and 'synced' with the graph.cool db.
There will be a more complete facebook user record in the auth0 db, and a subset of
the user record info in the graph.cool db.

## Notes
- User Authentication states (isAuthenticated, userSynced ...) in the redux store
depend on localStorage to persist these states after refreshes.
User related LocalStorage items should be completely clear after logouts.
- For now only using Facebook social auth.



### Todo:
- Clear out user query from apollo store when not logged in.
