import React from 'react'
import styled from 'styled-components'

const styles = {
  grid: {
    backgroundColor:'#716e6e',
  },
  col:{
    borderStyle:'solid',
    borderColor:'#3d6ff2',
  },
  col1: {
    backgroundColor:'#ffe640',
  },
  col2: {
    backgroundColor:'#40cbff',
    height:150,
    borderRadius:5,
  },
  row: {
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#2e2e2d"
  }
}

const AppBox = styled.div`
  min-height:100vh;
  width:100%;
  ${''/* height:100%; */}
  display: flex;
  flex-basis: auto;
  background-color: #716e6e;
  flex-direction: row;
`
const LeftPanel = styled.div`
 width: 20%;
 background-color: #ee6662;
`

const CenterPanel = styled.div`
 width: 60%;
 background-color: #7be1eb;
`


const RightPanel = styled.div`
  width: 20%;
  background-color: #d9dd3f;
`
const cards = [1,2,3,4,5]

const HomeLayout = () => {
  return(
    <AppBox>
      <LeftPanel/>
      <CenterPanel/>
      <RightPanel/>
    </AppBox>
  )
}

export default HomeLayout
