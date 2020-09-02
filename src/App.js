import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom'

import Login from './components/Login'
import Chat from './components/Chat'

function App(){
  // let location = useLocation()
  // console.log(location)
  return (
    <Router>
      <div>
        <Redirect 
          to={{
            pathname:'/chat'
          }}
        />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App