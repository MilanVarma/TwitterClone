import React,{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import TweetDesign from './TweetDesign.js';
import AddTweet from './AddTweet.js';
import Navbar from './Navbar';
import '../CSS/Navbar_Page.css'


import "../CSS/Home.css";

export default function Home() {
  const history = useHistory();
    const [tweets,setTweets] = useState([])

    const getTweets = () =>{
        fetch("http://localhost:9000/tweeter/tweets",{
            method:"GET",
            headers:{
              "x-auth-token":localStorage.getItem("token")
          }
        })
        .then((response) => {
          if(response.status === 200){
              return response.json();
          }
          
          throw new Error("Unauthorized");
          
        
      })
       .then((data) => {
         setTweets(data)
         console.log(data)
       })
       .catch((err) =>{
         history.push('/')
       })
    }

    useEffect(() =>{
        getTweets()
    },[])

    const deleteTweet = (id) =>{
      fetch(`http://localhost:9000/tweeter/deletetweet/${id}`,{
        method:"DELETE",
        headers:{
          'x-auth-token':localStorage.getItem("token")
        }
      })
      .then((res) =>{
        if(res.status == 200){
          return res.json()
        }

        throw new Error("Unathorized")
      })
      .then(() => setTweets(tweets.filter((tweet) => tweet._id != id)))
      
    }

   
  return (
    
      <div className='NavPage'>
     
     <Navbar />
          <div className="HomeBody">
          <AddTweet getTweets={getTweets}/>
          {tweets.map((tweet) =>(
              <TweetDesign key={tweet._id} data={tweet} deleteTweet={deleteTweet} getData = {getTweets}/>
          ))}
          </div>
     </div>
        
   
  )
}
