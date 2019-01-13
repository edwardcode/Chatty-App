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
      messages: [], // messages coming from the server will be stored here as they arrive
      counter:[1]
    }
  }

  //After component mount, handle the msgs came back from ws server to rerender by set state
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (evt) => {
      console.log(evt.data);
      const oldMessages = this.state.messages;
      const newMessage  = JSON.parse(evt.data);
      const newMessages = [...oldMessages, newMessage];

      switch(newMessage.type) {
        case "incomingMessage":
        // handle incoming message
          this.setState({
            messages: newMessages
          })
        break;

        case "incomingNotification":
        // handle incoming notification - if client changed name
          this.setState({
            messages: newMessages
          })
        break;

        case "counter":
        //handle counter - if new user connected
          this.setState({
            counter: newMessage
          })
        break;

        default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + newMessage.type);
      }
    }
  }

  //handle send msg to ws server if someone changed username
  addUsername = username => {
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

  //handle send msg to ws server if someone write a new msg in the chatbar
  addText = content => {
    let newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: content
      }

    if(newMessage.content !== "") {
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  //render the page
  render() {
    const howManyUser=`${this.state.counter.content} user${(this.state.counter.content>1)?'s' : ''} online`
    return (
      <main>
        <Navbar counter={howManyUser}/>
        <MessageList messages={this.state.messages} />
        <ChatBar addUsername={username => this.addUsername(username)} addText={content => this.addText(content)} currentUser={this.state.currentUser.name}/>
      </main>
    );
  }
}


export default App;


