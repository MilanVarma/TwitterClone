import React,{useState,useEffect} from 'react'
import '../CSS/AddTweet.css';
import Button from '@mui/material/Button';
import {
   
    useHistory
  } from "react-router-dom";
import Navbar from './Navbar';
import '../CSS/Navbar_Page.css'

export default function AddTweet({getTweets}) {
    const [tweet,setTweet] = useState('');

    const history = useHistory();

    const getTweet = () =>{
        fetch(`http://localhost:9000/tweeter/tweets`,{
          method:"GET",
          headers:{
            'x-auth-token':localStorage.getItem("token")
          }
        })
        .then((response) => {
          if(response.status == 200){
            return response.json()
          }
  
          throw new Error("Unauthorized")
        })
        .then((data) => setTweet(data.tweet))
        .catch((err) => history.push("/"))
      }
  
      useEffect(() =>{
        getTweet()
      },[]);

    const createTweet = (newTweet) =>{
        fetch("http://localhost:9000/tweeter/tweets",{
            method:"POST",
            body:JSON.stringify(newTweet),
            headers:{
                "Content-type":"application/json",
                'x-auth-token':localStorage.getItem("token")

            }
        })
        .then((res) =>{
            if(res.status == 200){
                return res.json()
            } 

            throw new Error('Unauthorized');
        })
        .then(() => {
          getTweets()
          setTweet('')
        })   
        .catch((err) =>{
            console.log(err.message)
            history.push("/")
        })
    }

    const AddTweet = () =>{
        const newTweet = {
            creatorId:localStorage.getItem("Id"),
            name:localStorage.getItem("Name"),
            tweet:tweet
        }

        createTweet(newTweet);
    }


  return (
    
   
    <div className='AddTweetBackground'>
        <textarea 
        
        placeholder="What's happening?" 
        value={tweet} 
        onChange={(e) => setTweet(e.target.value)}
        ></textarea>

        <div className='AddTweetButtons'>
        
        <Button variant="contained" onClick={() => AddTweet() }>Tweet</Button>
        </div>
       
    </div>
   
  )
}
