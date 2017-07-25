# Graphcool

## Making changes

- Any changes to the api that are not show in the schema file must be recorded
here ! ( i.e new permission or function)

## Migrating to new api

1. Change api and subscription uri in index.js
2. Add SSS in graphcool console.
3. redo permissions in graphcool console.
4. Set up auth in graphcool console.
5. Set up integrations (Algolia...)

--------------------------------------------------------------------------------
## Permissions
### User:
- `read` everyone
- `create` everyone
- `delete` nobody

### Challenge:
- `read` everyone
- `create` authenticated
- `update` Only Challenge author (User) can update
- `delete` Only Challenge author (User) can delete

### Score:
- `Read` everyone
- `Create` authenticated
- `Update` authenticated
- `Delete` nobody (console only)

### Scorecard
- `read` everyone
- `create` everyone ( Need to be able to create Scorecard when creating a user.)
- `update` Users can only update their own Scorecard
- `delete` nobody (console)


> Todo: Need to create admin system for permissions.

--------------------------------------------------------------------------------

## Functions

- Graphcool API is extended using serverless functions that are invoked in response
to server events (SSS: Server Side Subscriptions) or as a part of the request pipeline.
[https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/](url)
### Repository for Serverless webtask functions:
 [https://github.com/PatrickStrz/kovi-webtasks](url)

### SSS
1. `Event:` new Score created. `function brief:` update total field on Scorecard type
for user.
`file:` update-scorecard-totals.js
