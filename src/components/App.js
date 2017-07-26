import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {muiTheme} from '../lib/theme/mui-theme'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Site from './Site'
import Home from './Home'
import Layout from './dev/Layout'
import Animation from './dev/Animation'

class App extends Component {
  devRoute = `/${process.env.REACT_APP_DEV_ROUTE}/`

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <Site>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" render={() => <h1>about</h1>} />
              <Route exact path={this.devRoute} render={() => <h1>Secret dev page</h1>}/>
              <Route exact path={this.devRoute + 'layout'} component={Layout}/>
              <Route exact path={this.devRoute + 'animation'} component={Animation} />
              <Route render={() => <h1>Page doesn't exist  ¯\_(ツ)_/¯</h1>}/>
            </Switch>
          </Site>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
