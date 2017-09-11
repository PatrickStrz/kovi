import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {muiTheme} from 'styles/theme/mui-theme'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Site from 'components/Site'
import Home from 'components/Home'
import ChallengeDetailContainer from 'components/ChallengeDetailContainer'

class App extends Component {
  devRoute = `/${process.env.REACT_APP_DEV_ROUTE}/`

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <Site>
            <Route path="/" component={Home} />
            <Route path="/challenge/:id" component={ChallengeDetailContainer}/>
            <Switch>
              <Route exact path="/about" render={() => <h1>about</h1>} />
              <Route exact path={this.devRoute} render={() => <h1>Secret dev page</h1>}/>
            </Switch>
          </Site>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
