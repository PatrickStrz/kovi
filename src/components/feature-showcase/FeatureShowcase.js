import React, {Component} from 'react'
//other
import styled, {css} from 'styled-components'
import {muiColors, colors} from 'styles/theme/colors'
import {FEATURE_BOX_SHADOW} from 'styles/shadows'
import {features} from './featureData'

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
  text-align: center;
  font-size: 18px;
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

export default FeatureShowcase
