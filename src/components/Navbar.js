import React,{Component} from 'react'
import AppBar from 'material-ui/AppBar'


class Navbar extends Component {

  styles = {
    title: {
      color: '#3f51b5',
    },
    navbar: {
      backgroundColor:"#ffffff",
    }
  }

  render(){
    return(
      <AppBar
        style={this.styles.navbar}
        titleStyle={this.styles.title}
        title="KOVI"
        // iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    )
  }
}

export default Navbar
