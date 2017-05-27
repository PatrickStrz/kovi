import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {muiTheme} from '../lib/theme/mui-theme'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Site from './Site'
import Home from './Home'
import Editor from './Editor'
import Dialog1 from './Dialog1'


class App extends Component {
  render() {
    return(
    <div>
      {/* <Editor /> */}
      {/* <MuiThemeProvider muiTheme={muiTheme}><Dialog1/></MuiThemeProvider> */}
      <MuiThemeProvider muiTheme={muiTheme}>


        <BrowserRouter>
          <Site>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" render={() => <h1>about</h1>} />
              <Route render={() => <h1>Page doesn't exist  ¯\_(ツ)_/¯</h1>}/>
            </Switch>
          </Site>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
    )
  }
}

export default App
