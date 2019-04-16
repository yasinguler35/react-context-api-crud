import React, { Component } from 'react';
import './App.css';
import Navbar from './componets/Navbar';
import Users from './componets/Users';
import AddUser from './form/AddUser';
import UpdateUser from './form/UpdateUser';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import NotFound from './pages/NotFound'
import Contribute from './pages/Contribute';
class App extends Component {
  
  render() {
    return (
    <Router>
      <div className="container">
                 <br/>
       {/* <Test Test="deneme app"/> */}
       <Navbar title="User App"/>
       <hr/>
       <Switch>
       <Route exact path="/" component={Users}/>
       <Route exact path="/add" component={AddUser}/>
       <Route exact path="/edit/:id" component={UpdateUser}/>
       <Route component={NotFound}/>
       </Switch>
       <Contribute></Contribute>

     

      </div>
      </Router>
    );
  }
}

export default App;
