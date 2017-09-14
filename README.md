# Kovi.io

Collaboration platform for user contributed world challenges and technological
tools.



## Getting Started

1. `git clone git@github.com:PatrickStrz/kovi.git`
2. Add the following secrets to .env file:
```
REACT_APP_AUTH0_CLIENT_ID='XXXX' //from auth0 console
REACT_APP_AUTH0_DOMAIN='XXXX' //from auth0 console
REACT_APP_DEV_ROUTE='XXXX' //to view development only routes. i.e) mockup of
app layout is available for developers that know this secret
REACT_APP_GRAPHCOOL_ENDPOINT='wss://XXXX' //use dev api in development
REACT_APP_GRAPHCOOL_WSS_ENDPOINT='https://XXXX' //use dev api wss in development.
NODE_PATH = 'src' //to enable absolute imports
```
 3. install dependencies `npm install`

## Deployment

Automatically deploys to Heroku when admin user merges to master.

**Make sure env variables set in production ( heroku Config Vars )

## Built With

* React
* Redux
* create react app
* Apollo client
* GraphQL: [graph.cool](url) ( graphql backend as a service) +
Webtask ( serverless functions)
* Sentry
* Heroku
* Auth0/ Auth0 lock

## Documentation

* check out `./docs` for kovi specific docs
* check out `CREATE_REACT_APP_README.md` for any create-react-app stuff.

## Project structure overview:
1. All GraphQL operations (queries, mutations, subscriptions) in `gql/` directory.
2. All custom easily reusable ui components in `ui-kit/`
3. All other components in `components/` directory. Data fetching components
(Components with Apollo gql queries) names end in Container. ** Don't confuse
with redux style Container-Component project structure. Other components may
still be connected to redux and Apollo (i.e so don't have to pass muations down
multiple levels), but they are not primary data fetching components.
4. Global style related files are in `styles/` directory  ( animations/ css/ z-Index ...)
