import React from 'react'
import{ Switch, Route } from 'react-router-dom'
import Signup from './Components/Signup'
import Signin from './Components/Signin'

function App() {
  return(
    <>
      <div className="App">
        <Switch>
          <Route exact path ='/'>
            <Signup />
          </Route>
          <Route path='/signin'>
            <Signin />
          </Route>
        </Switch>
      </div>;
    </>
  )
}

export default App;
