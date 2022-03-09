import react from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './CSS/App.css';

import Login from './Routes/Login';
import SignUp from './Routes/SignUp';
import AddTweet from './Routes/AddTweet.js';
import EditTweet from './Routes/EditTweet.js';
import Profile from './Routes/Profile';
import Home from './Routes/Home';
import AnotherUserProfile from './Routes/AnotherUserProfile'
import TwitterLogoNavbar from './Routes/TwitterLogoNavbar';


function App() {
  
  return (
   
   <Router>
    
   <TwitterLogoNavbar />
      

      <Switch>

      

         <Route exact path="/profile">
            <Profile />
        </Route>

        <Route exact path="/ViewProfile/:id">
          <AnotherUserProfile />
        </Route>

       

        <Route exact path="/edittweet/:id">
         <EditTweet />
        </Route>

      
   
         <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/signup">
          <SignUp />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>
        </Switch >
   </Router> 
  );
}

export default App;
