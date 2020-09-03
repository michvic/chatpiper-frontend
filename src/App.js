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

import {isAuthenticated} from './service/auth'


const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )
      }
    />
  );
};

function App() {
  // let location = useLocation()
  // console.log(location)
  return (
    <Router>
      <div>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <Chat />
          </PrivateRoute>
        </Switch>
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      </div>
    </Router>
  )
}

export default App