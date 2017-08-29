import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'
import Popover from 'material-ui/Popover'
import Avatar from 'ui-kit/Avatar'

const Box = styled.div`
  height:125px;
  width:125px;
  background-color: rgb(110, 193, 240);
`
const Name = styled.h4`
  color:rgb(255, 255, 255);
`

export default class MuiPopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div style={{height:45, width:45}}>
        <div onClick={this.handleTouchTap}>
          <Avatar size='40px' imageUrl="https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14079619_10154275347846251_1836046172102598566_n.jpg?oh=d54f238bc1d112a7655bd7d0354ac3c5&oe=5A2E211C"/>
        </div>

        <Popover
          style={{height:125, width:125}}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'middle', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Box>
            <Avatar size='20px' imageUrl="https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14079619_10154275347846251_1836046172102598566_n.jpg?oh=d54f238bc1d112a7655bd7d0354ac3c5&oe=5A2E211C"/>
            <Name>Patrick Strzelec</Name>
          </Box>
        </Popover>
      </div>
    );
  }
}
