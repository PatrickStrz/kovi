import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';

// const styles = {
//   ro
// }
const GridTest = () => {
  return(
    <Grid>

      <Row>
      <Col lg={12}>
        <div style={{backgroundColor:'red'}}>
          yoooo

            <Col lg={6}>
              <div style={{backgroundColor:'blue', height:150}}> yoo2
                <Row>
                  <Col lg={6}>
                    <div style={{backgroundColor:'yellow', height:50}}>
                      3
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div style={{backgroundColor:'yellow', height:50}}>
                      3
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <div style={{backgroundColor:'yellow', height:50}}>
                      3
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div style={{backgroundColor:'yellow', height:50}}>
                      3
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

        </div>
      </Col>
      </Row>
    </Grid>
  )
}

export default GridTest
