import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/signup.js';
import Login from './components/login.js';


const App: React.FC = () => {
  return (
    
    <Router>
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
        </Switch>
      </div>
    </Router>
    
  );
};

export default App;