import React, {Component} from 'react'
//other
import styled, {css} from 'styled-components'
import {muiColors, colors} from 'styles/theme/colors'
import {FEATURE_BOX_SHADOW} from 'styles/shadows'

const Box = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FeatureBox = styled.div`
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: solid 3px rgb(219, 219, 219);
`

const Title = styled.h2`
  color: ${muiColors.primary1};
`

const ImageFrame = styled.div`
  padding: 10px;
  border-radius: 3px;
  background-color: ${muiColors.primary1};
  display: flex;
  justify-content: center;
  ${FEATURE_BOX_SHADOW}
`

const Image = styled.img`
  ${props => css`height:${props.height}; width:${props.width}`}
  display: flex;
  border-radius: 3px;
`

const Description = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  color: ${colors.medGrey};
  width: 60vw;
`

const features = [
  {
    title:  "Know who is contributing in real time ",
    imageUrl: "https://files.graph.cool/cj6o9kpt72gao017850frjw3q/cj8ezn2hq00b901553mw816lo",
    description: `The community button in the bottom bar changes to a clickable
    avatar whenever a new contribution occurs. This allows you to stay on top of
    the most recent community level changes as they happen.`
  },
  {
    title:"Real time Community board updates",
    imageUrl: "https://files.graph.cool/cj541g35wjwqc01754kb4rfvk/cj8f4ondf00ks01554dhymloe",
    description: `
    See the community aggregate score grow and who helped push it forward.
    `
  },
  {
    title: "User Cards",
    imageUrl: "https://files.graph.cool/cj541g35wjwqc01754kb4rfvk/cj8f3zxzd00k801555fis5ns0",
    description: `
      See what your friends are up to from anywhere in the app.
    `
  },
  {
    title:"Animated actions",
    imageUrl: "https://files.graph.cool/cj541g35wjwqc01754kb4rfvk/cj8f3wl2400k40155zpv6w5sm",
    description: `
     We aim to make micro-interactions
    within the app feel fun and to give you more response to your inputs.
    `
  },
  {
    title: "Easy contribution experience",
    imageUrl: "https://files.graph.cool/cj541g35wjwqc01754kb4rfvk/cj8f4d01s00kg0155vhuc4j0m",
    description: `
      Simple interface to make it easy to contribute content to the community
      whether on mobile or desktop.
    `
  },
  {
    title: "Styled content",
    imageUrl: "https://files.graph.cool/cj541g35wjwqc01754kb4rfvk/cj8fcsomg00qt01559252gryf",
    description: `
      Your content is beautifully styled automatically.
    `
  },
  {
    title: "Discussions",
    imageUrl: "https://files.graph.cool/cj541g35wjwqc01754kb4rfvk/cj8fef3tc00ui0155sqgol9ym",
    description: `
      Discuss world challenges and how they can be solved using technology.
    `
  },

]

class FeatureShowcase extends Component {
  renderFeatures = () => {
    return features.map(feature => {
      return(
        <FeatureBox key={feature.title}>
        <Title>{feature.title}</Title>
        <ImageFrame>
          <Image
            src={feature.imageUrl}
          />
        </ImageFrame>
        <Description>
          {feature.description}
        </Description>
      </FeatureBox>
      )
    })
  }

  render(){
    return(
      <Box>
        {this.renderFeatures()}
      </Box>
    )
  }
}

export default FeatureShowcase
