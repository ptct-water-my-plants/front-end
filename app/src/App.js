// modules
import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from 'react-router-dom'

// components
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Inventory from './Components/Inventory'

function App() {
  return(
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Signup />
          </Route>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/inventory'>
            <Inventory />
          </Route>
        </Switch>
      </div>;
    </Router>
  )
}

export default App;
