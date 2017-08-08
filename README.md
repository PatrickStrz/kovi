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
NODE_PATH = 'src' //to allow absolute imports
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
