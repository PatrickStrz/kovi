import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

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
const cards = [1,2,3,4,5]

const Layout = () => {
  return(

    <Grid fluid style={styles.grid}> {/* site.js */}
      <div>{/* Home.js */}
        <Row style={styles.row}> {/* ChallengeList.js */}
          <Col style={styles.col} xsOffset={1} xs={10} lgOffset={2} lg={8}>
              <Row>
                {cards.map((card)=>{
                return(
                  <Col style={styles.col} key={card} xs={12} lg={12}>
                    <div> {/* ChallengeCard.js */}
                      <div style={styles.col2}>card#:{card}</div>
                    </div>
                  </Col>
                )
              })}
              </Row>
              <Row>
                <Col xsOffset={5} xs={1}>
                  <button>
                    New challenge
                  </button>
                </Col>
              </Row>
          </Col>
        </Row>
      </div>
    </Grid>
  )
}

export default Layout
