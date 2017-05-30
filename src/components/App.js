import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {muiTheme} from '../lib/theme/mui-theme'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Site from './Site'
import Home from './Home'
import GridTest from './GridTest'
// import { Grid, Row, Col } from 'react-flexbox-grid';

class App extends Component {
  devRoute = `/${process.env.REACT_APP_DEV_ROUTE}/`

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          {/* <Grid fluid> */}
          <Site>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/grid" component={GridTest} />
              <Route path="/about" render={() => <h1>about</h1>} />
              <Route path={this.devRoute} render={() => <h1>Secret dev page</h1>}/>
              <Route render={() => <h1>Page doesn't exist  ¯\_(ツ)_/¯</h1>}/>
            </Switch>
          </Site>
        {/* </Grid> */}
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
