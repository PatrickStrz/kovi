import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {muiTheme} from '../lib/theme/mui-theme'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Site from './Site'
import Home from './Home'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <BrowserRouter>
          <Site>
            {/* <div className="grid-center"> */}
                <Route exact path="/" component={Home} />
                <Route path="/about" render={() => <h1>about</h1>} />
                {/* <Route path="/post/:id" component={PostDetail} /> */}
                {/* <Route render={() => <h1>Page Not Found</h1>}/> */}
            {/* </div> */}
            </Site>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
