import React, {useEffect, useState} from 'react';
import Pusher from "pusher-js"
import './App.css';

import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import axios from "./axios";

const App = () => {
	const [messages, setMessages] = useState([])

  useEffect(() => {
  	axios.get("/api/v1/messages/sync")
  	.then(response => {
  		setMessages(response.data)
  	})
  })

  useEffect(() => {
    var pusher = new Pusher('8e30429ae68f45dbceea', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])
  return (
    <div className="App">
	    <div className="app__body">
	   	  <Sidebar />
	      <Chat messages={messages}/>
	    </div>
    </div>
  );
}

export default App;


