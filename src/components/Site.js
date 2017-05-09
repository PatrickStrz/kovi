import React,{Component} from 'react'
import Navbar from './Navbar'
// import Home from './components/Home'

class Site extends Component {
  styles = {
    body: {
      backgroundColor:"#f6f0f0",
    }
  }

  render(){
    return(
      <div>
        <Navbar />
        <div className="grid-center" style={this.styles.body}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Site
