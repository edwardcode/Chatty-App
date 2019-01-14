import React, {Component} from 'react';
import ChatBar            from './ChatBar.jsx';
import Message            from './Message.jsx';
import MessageList        from './MessageList.jsx';



const Navbar = (props) => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="navbar-userscount">{props.counter} </span>
    </nav>
  );
}




class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: "Anonymous " },
      messages: [],
      counter:[1]
    }
  }


  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (evt) => {
      //type:counter, content:1
      console.log(evt.data);
      const oldMessages = this.state.messages;
      const newMessage  = JSON.parse(evt.data);
      const newMessages = [...oldMessages, newMessage];

      switch(newMessage.type) {
        case "incomingMessage":

          this.setState({
            messages: newMessages
          })
        break;

        case "incomingNotification":

          this.setState({
            messages: newMessages
          })
        break;

        case "counter":

          this.setState({
            counter: newMessage
          })
        break;

        default:

        throw new Error("Unknown event type " + newMessage.type);
      }
    }
  }


  changeUserName = username => {
    let newUser = {
        type: "postNotification",
        content: `${this.state.currentUser.name} changed name to ${username}`
      }

    if(this.state.currentUser.name !== username) {
      this.socket.send(JSON.stringify(newUser));
      this.setState({
        currentUser: {name: username}
      })
    }
  }


  addNewText = content => {
    let newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: content
      }

    if(newMessage.content !== "") {
      this.socket.send(JSON.stringify(newMessage));
    }
  }


  render() {
    const howManyUser=`${this.state.counter.content} user${(this.state.counter.content>1)?'s' : ''} online`
    return (
      <main>
        <Navbar      counter={howManyUser}/>
        <MessageList messages={this.state.messages} />
        <ChatBar     changeUserName={username => this.changeUserName(username)}
                     addNewText={content => this.addNewText(content)}
                     currentUser={this.state.currentUser.name}
        />
      </main>
    );
  }
}


export default App;


