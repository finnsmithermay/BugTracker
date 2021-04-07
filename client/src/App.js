import './App.css';
import React, {Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';

import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import AddProject from './components/profile-forms/AddProject';

import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Project from './components/project/Project';
import ProjectMember from './components/project/projectMembers';
import AddTicket from './components/project/AddTicket';
import EditTicket from './components/project/editTicket'
import Projects from './components/project/projects';
import Ticket from './components/project/Ticket';



import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App =() => { 
  
  useEffect(() => {
    store.dispatch(loadUser());

  }, []);

  return(

  <Provider store={store}>
  <Router>
     <Fragment>
        <Navbar/>
        <Route exact path="/" component={Landing}/>

        <section className="container">
          <Alert/>
            <Switch>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/profiles" component={Profiles}/>
            <Route exact path="/profile/:id" component={Profile}/>

            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>

   
            <PrivateRoute exact path="/add-experience" component={AddExperience}/>
            <PrivateRoute exact path="/add-project" component={AddProject}/>

            <PrivateRoute exact path="/add-education" component={AddEducation}/>
            <PrivateRoute exact path="/posts" component={Posts}/>
            <PrivateRoute exact path="/posts/:id" component={Post}/>
            
            <PrivateRoute exact path="/project/:id" component={Project}/>
            <PrivateRoute exact path="/project/members/:id" component={ProjectMember}/>
            <PrivateRoute exact path="/add-ticket/:id" component={AddTicket}/>
            <PrivateRoute exact path="/edit-ticket/:id" component={EditTicket}/>
            <Route exact path="/projects" component={Projects}/>
            <PrivateRoute exact path="/ticket/:id" component={Ticket}/>


            </Switch>

        </section>

    </Fragment>
 
  </Router>
  </Provider>
   
)};

export default App;
