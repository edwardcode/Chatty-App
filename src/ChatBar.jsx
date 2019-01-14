import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.currentUser,
      text: ""
    }
  }


  inputChange = evt => {
    if(evt.target.name === "username"){
      this.setState({name: evt.target.value})
    }
    if(evt.target.name === "text"){
      this.setState({text: evt.target.value});
    }
  }

  userNameInput = evt => {

    if(evt.key == 'Enter') {
      evt.preventDefault();
      this.props.changeUserName(this.state.name);
    }
  }

  textInput = evt => {

    if(evt.key == 'Enter') {
      evt.preventDefault();
      this.props.addNewText(this.state.text);
      evt.target.value='';
      this.setState({text: ""})
    }
  }

  render(){
    return (
      <footer className="chatbar" >
        <input className="chatbar-username"
               placeholder="Your Name (Optional)"
               name="username"
               defaultValue={this.state.name}
               onChange={this.inputChange}
               onKeyPress={this.userNameInput}
        />
        <input className="chatbar-message"
               placeholder="Type a message and hit ENTER"
               name="text"
               onChange={this.inputChange}
               onKeyPress={this.textInput}
        />
      </footer>
    );
  }
}


