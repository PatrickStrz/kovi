# Code Style Guide

### Using modified Airbnb  js guide
- Use Kovi guide first, Airbnb guide for anything that is not coverered.

- Use [Shopify](https://github.com/Shopify/javascript) for the following:

  1. Whitespace

# Kovi JS Guide

##  File Names
  - JSX: `PascalCase.js`
  - js files: `lower-kebab-case.js`
  - directories: `lower-kebab-case`


## Import statements
  - organize imports by type separated by spaces or comments (_so it's easier to make
  changes and get an idea of what is available in the file at a glance_):
      1. React/Redux related
      2. gql/Apollo
      3. Helpers/other
      4. Components ( put own components first and components from libraries next)

      i.e)

       ```
        //react + redux
        import React, {Component} from 'react'
        import {connect} from 'react-redux'
        import { bindActionCreators } from 'redux'
        import { hideCreateChallengeView } from '../actions/challenge-actions'
        //gql
        import {graphql, compose} from 'react-apollo'
        import {allChallengesQuery, moreChallengesQuery} from '../queries/challenge-queries'
        import {createChallengeMutation} from '../mutations/challenge-mutations'
        //other
        import {requireAuth} from '../lib/auth'
        import {uniqBy} from 'lodash'
        // React components, own + external
        import ChallengeCard from './ChallengeCard'
        import ChallengeCreateForm from './ChallengeCreateForm'
        import RaisedButton from 'material-ui/RaisedButton'
        import {Row, Col} from 'react-flexbox-grid'
        import InfiniteScroll from 'react-infinite-scroll-component'
        import FormDialog from './FormDialog'`
      ```
  - use multiline imports if don't fit one line:
      ```
      import {
        helper1,
        helper2,
        helper3,
        helper4,
        helper5,
      } from 'lib'
      ```

  ## Arrow Functions:

   - don't need brackets for single params

   ` oneParam => ({
   key: 'can use brackets to return objects'
   })`

  - use brackets for multiple parameters:

   ```
   (paramA, paramB) => {
    console.log(paramA+paramB)
    return('only returning a string')
   }
   ```
