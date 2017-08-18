import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {muiTheme} from 'styles/theme/mui-theme'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Site from './Site'
import Home from './Home'
import Layout from './dev/Layout'
import HomeLayout from './dev/HomeLayout'

class App extends Component {
  devRoute = `/${process.env.REACT_APP_DEV_ROUTE}/`

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <Site>
            {/* <div> */}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" render={() => <h1>about</h1>} />
                <Route exact path={this.devRoute} render={() => <h1>Secret dev page</h1>}/>
                <Route exact path={this.devRoute + 'layout'} component={Layout}/>
                <Route exact path={this.devRoute + 'layout/home'} component={HomeLayout}/>
                <Route render={() => <h1>Page doesn't exist  ¯\_(ツ)_/¯</h1>}/>
              </Switch>
            {/* </div> */}
          </Site>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
