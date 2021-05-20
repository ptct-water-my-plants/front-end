import React from 'react'
import{ Switch, Route } from 'react-router-dom'
import Signup from './Components/Signup'
import Signin from './Components/Signin'

function App() {
  return(
    <>
      <div className="App">
        <Switch>
          <Route>
            <Signup />
          </Route>
          <Route>
            <Signin />
          </Route>
        </Switch>
      </div>;
    </>
  )
}

export default App;
