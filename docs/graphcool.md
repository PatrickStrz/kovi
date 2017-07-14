# Graphcool

## Migrating to new api

1. Change api and subscription uri in index.js
2. Add SSS in graphcool console.
3. redo permissions in graphcool console.
4. Set up auth in graphcool console.

## permissions

### User

update:  entire type (all fields), make sure that users can only update their
own records.

delete : only through console.

### challengesReducer

create + update:
