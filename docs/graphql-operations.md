# GraphQL operations ( queries, mutations, subscriptions, fragments)

Use the following folder structure for all GraphQL operations:
```
src/
├── gql/
    ├── GraphQLTypname/
        ├── fragments.js
        ├── mutations.js
        ├── queries.js
        ├── subscriptions.js
 ```

** Note: `GraphQLTypname/` above refers to the GraphQL type of the query/mutation
root according to the graphcool api schema. i.e) `Challenge/`, `Comment/`.
For more complex use cases can create a subdirectory under `gql/` for specific
components with complex data requirements.
 This folder structure makes queries reusable and easy to find.
 All GraphQL operations are to be imported into components, never
 define an operation in a component.

**Notes:**

- Use `fragments` wherever possible. Apollo keeps track
of queries based on query shape, type and id. Using query fragments helps to ensure
consistency between these 3 factors helping enforce UI consistency
( any queries that involve an identical object are updated in the store, so won't have different
values for the same piece of data in different components). [Apollo docs url](http://dev.apollodata.com/core/how-it-works.html#normalize)
