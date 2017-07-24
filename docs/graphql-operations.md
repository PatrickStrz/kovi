# GraphQL operations ( queries, mutations, subscriptions)

Use the following folder structure within `src/gql`
```
src
├── gql
    ├── graphql_typename.js
        ├── fragments.js
        ├── mutations.js
        ├── queries.js
        ├── subscriptions.js
 ```

 This folder structure makes queries easy to find and reusable.
 All graphql operations are to be imported into components, never
 define an operation in a component.

**Notes:**

- Use fragments wherever possible. The Apollo keeps track
of queries based on query shape, type and id. Using query fragments helps to ensure
consistency between these 3 factors helping enforce UI consistency
( any queries that involve an identical object are updated in the store, so won't have different
values for the same piece of data in different components). [Apollo url](http://dev.apollodata.com/core/how-it-works.html#normalize)
