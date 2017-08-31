import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  showUpdateChallengeView,
  hideUpdateChallengeView
} from 'actions/challenge-actions'
//lib + other
import styled from 'styled-components'
import DOMPurify from 'dompurify' //prevents XSS
import {colors, muiColors} from 'styles/theme/colors'
//components
import ChallengeCommentsContainer from 'components/ChallengeCommentsContainer'
import ChallengeFormContainer from 'components/ChallengeFormContainer'
import FaIconButton from 'ui-kit/icons/FaIconButton'

/*
 Note: Because rendering <ChallengingCommentContainer/> in this element,
commentsquery is only performed after query in ChallengeDetailContainer
container completes.For this use case it works since we do not want comments to
render before the body.
*/
const MarkdownBox = styled.div`
  background-color: #d2fffc;
  border-radius: 3px;
  padding: 20px;
`
const Title = styled.h2`
  color: #49494a;
`
const CommentsHeading = styled.h4`
  color: ${colors.lightGrey};
`
const LineBreak = styled.hr`
  border: solid 1px ${colors.faintGrey};
`

class ChallengeDetail extends Component{
  static propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired, //html string
    id: PropTypes.string.isRequired,
  }

  state = {
    edit: false
  }

  isUpdateViewOpen = () =>{
    const {id, openUpdateViewId} = this.props
    if (openUpdateViewId === id){
      return true
    }
    else{
      return false
    }
  }

  toggleEdit = () => {
    const {hideUpdateChallengeView, showUpdateChallengeView, id } = this.props
    if (this.isUpdateViewOpen()){
      hideUpdateChallengeView()
    }
    else{
      showUpdateChallengeView(id)
    }
  }

  renderBody = () => {
    const {title, body, id, openUpdateViewId} = this.props
    if (this.isUpdateViewOpen()) {
      return(
        <ChallengeFormContainer
          defaultValues={{title, body}}
          update={true}
          challengeId={id}
        />
      )
    }
    else{
      return(
      <div>
        <Title>{title}</Title>
        <MarkdownBox>
          <div
            className="content"
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(body)}}
          />
        </MarkdownBox>
      </div>
      )
    }
  }

  render(){
    const {id} = this.props
    return(
      <div>
        <FaIconButton
          faClassName={this.isUpdateViewOpen() ? "fa-close" : "fa-pencil"}
          size="20px"
          onClick={this.toggleEdit}
          color={colors.lightGrey}
          hoverColor={muiColors.secondary1}
        />
        {this.renderBody()}
        <LineBreak />
        <ChallengeCommentsContainer challengeId={id}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hideUpdateChallengeView,
    showUpdateChallengeView,
  }, dispatch)
}

const mapStateToProps = (state) => ({
  openUpdateViewId: state.app.challenges.openUpdateViewId,
})

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDetail)
