import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import ReactGA from 'react-ga'

/* This component keeps track of Route Changes because onUpdate
attribute of BrowserRouter removed in react-router 4 api*/

class RouteChange extends Component {
  env = process.env.REACT_APP_ENV

  componentDidMount = () => {
    //on initial render:
    this.env === 'production' && this.logPageView()
  }

  componentWillReceiveProps = (nextProps) => {
    //on every RouterChange:
    this.env === 'production' && this.logPageView()
  }
  // google analytics:
  logPageView = () => {
    ReactGA.set({ page: window.location.pathname + window.location.search })
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  render(){
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(RouteChange)
