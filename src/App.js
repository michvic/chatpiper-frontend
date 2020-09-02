import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom'

import Login from './pages/Login'
import Chat from './pages/Chat'

function App(){
  // let location = useLocation()
  // console.log(location)
  return (
    <Router>
      <div>
        <Redirect 
          to={{
            pathname:'/login'
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