import React from 'react'
import styled from 'styled-components'

const LayoutAppBox = styled.div`
  min-height:100vh;
  width:100%;
  ${''/* height:100%; */}
  display: flex;
  flex-basis: auto;
  background-color: #dddddd;
  flex-direction: row;
`
const LayoutLeftPanel = styled.div`
 width: 20%;
 border: solid 6px #ee6662;
`

const LayoutCenterPanel = styled.div`
 width: 60%;
 border: solid 6px #7be1eb;
 display: flex;
 flex-direction: column;
`


const LayoutRightPanel = styled.div`
  width: 20%;
  border: solid 6px #ee6662;
`

const Card = styled.div`
  display: flex;
  background-color: #40cbff;
  height: 150px;
  border-radius: 5;
  margin: 5px;
`
const cards = [1,2,3,4,5]

const HomeLayout = () => {
  return(
    <LayoutAppBox>
      <LayoutLeftPanel/>
        <LayoutCenterPanel>
          {cards.map(card => <Card key={card}>card:{card}</Card>)}
        </LayoutCenterPanel>
      <LayoutRightPanel/>
    </LayoutAppBox>
  )
}

export default HomeLayout
