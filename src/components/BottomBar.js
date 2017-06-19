import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { showCreateChallengeView } from '../actions/challenge-actions'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>
const nearbyIcon = <IconLocationOn />

class BottomBar extends Component {
  state = {
    selectedIndex: 0,
  }

  styles = {
    body: {
      width:'100vw'
    }
  }

  select = (index) => this.setState({selectedIndex: index})

  render() {
    return (
      <Paper zDepth={1} style={this.styles.body}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} >
          <BottomNavigationItem
            label="Create Challenge"
            icon={recentsIcon}
            // onTouchTap={() => this.select(0)}
            onTouchTap={() => this.props.showCreateChallengeView()}
          />
          <BottomNavigationItem
            label="Favorites"
            icon={favoritesIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Nearby"
            icon={nearbyIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      showCreateChallengeView
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(BottomBar)
