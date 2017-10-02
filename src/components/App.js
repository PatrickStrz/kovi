import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {muiTheme} from 'styles/theme/mui-theme'
import {BrowserRouter, Route} from 'react-router-dom'
import Site from 'components/Site'
import Home from 'components/Home'
import CompetitionDetailContainer from 'components/competitions/CompetitionDetailContainer'
import EntryDetailContainer from 'components/competitions/EntryDetailContainer'

class App extends Component {
  devRoute = `/${process.env.REACT_APP_DEV_ROUTE}/`

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <Site>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" render={() => <h1>about</h1>} />
            <Route exact path={this.devRoute}
                render={() => <h1>Secret dev page</h1>}
            />
            <Route path='/competition/:id' component={CompetitionDetailContainer}/>
            <Route
              path="/competition/:competition_id/entry/:entry_id"
              component={EntryDetailContainer}
            />
          </Site>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
