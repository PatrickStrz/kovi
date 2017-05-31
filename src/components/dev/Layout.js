import React from 'react'
import '../layout.css'
import { Grid, Row, Col } from 'react-flexbox-grid'

const styles = {
  grid: {
    backgroundColor:'#ff4040',
    // height:'auto'
  },
  col1: {
    backgroundColor:'#ffe640',
  },
  col2: {
    backgroundColor:'#40cbff',
    height:100,
  }
}
const cards = [1,2,3,4,5]

const Layout = () => {
  return(
    <Grid fluid>
      <div className="main" style={styles.grid}>
        <Row>
          <Col xsOffset={3} xs={6} >
            <div>
              <Row>
                {cards.map((card)=>{
                return(
                  <Col key={card} xs={12}>
                  <div style={styles.col2}>card#:{card}</div>
                  </Col>
                )
              })}
              </Row>
              <Row>
                <Col xsOffset={5} xs={1}>
                  <button>
                    NEW problem
                  </button>
                </Col>
              </Row>
            </div>

          </Col>
        </Row>
      </div>
    </Grid>
  )
}

export default Layout
