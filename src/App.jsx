import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


function NavBar({counter}){
  return (<nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
             <span className="navbar-userscount"> {counter} </span>
          </nav>
          )
};



class App extends Component {
  constructor(){
    super();
    this.state={
      currentUser:'Anonymous',
      message:[],
      counter:1,

      };

  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({loading:false});

    },3000)
  }




  render() {
     const countUserNb= `${this.state.counter} user${(this.state.counter > 1) ? 's' : ''} online`

    return (
      <div>
         <NavBar counter={countUserNb}  />

         <MessageList   />

         <ChatBar


         />

      </div>
    );
  }
}
export default App;
