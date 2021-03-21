import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'


const App = () => {
  return (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} />
  </Router>
  )
};

export default App;

 //component router, has two routes..path equal to root
  //when users comes on page,he is going to be greeted with join component
  //inside join component he will pass his data into login form then through query strings
  //pass the data through to the chat,, once we have data we will render the chat component
