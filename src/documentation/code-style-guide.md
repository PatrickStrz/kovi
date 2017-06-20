# Kovi Code Style Guide

## Import statements
  - organize imports by type separated by spaces (_so it's easier to change and get an idea of what is available in the file_):
      1. React/Redux related
      2. Apollo
      3. Helpers/other
      4. Components ( put own components first and components from libraries next)

      i.e)

       `import React,{Component} from 'react'
        import {connect} from 'react-redux'
        import { bindActionCreators } from 'redux'
        import { hideCreateChallengeView } from '../actions/challenge-actions'


        import {graphql, compose} from 'react-apollo'
        import {allChallengesQuery, moreChallengesQuery} from '../queries/challenge-queries'
        import {createChallengeMutation} from '../mutations/challenge-mutations'

        import {requireAuth} from '../lib/auth'
        import {uniqBy} from 'lodash'

        import ChallengeCard from './ChallengeCard'
        import ChallengeCreateForm from './ChallengeCreateForm'
        import RaisedButton from 'material-ui/RaisedButton'
        import {Row, Col} from 'react-flexbox-grid'
        import InfiniteScroll from 'react-infinite-scroll-component'
        import FormDialog from './FormDialog'`
