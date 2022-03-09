import React,{useState,useEffect} from 'react'
import '../CSS/AddTweet.css';
import Button from '@mui/material/Button';
import { useHistory,useParams } from 'react-router-dom';


export default function EditTweet() {
    const [tweet,setTweet] = useState('');

    const history = useHistory();
    const {id} = useParams();

    const getTweet = () =>{
      fetch(`http://localhost:9000/tweeter/tweets/${id}`,{
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

    const UpdateTweet = (tweetdata) =>{
      fetch(`http://localhost:9000/tweeter/edittweet/${id}`,{
        method:'PUT',
        body:JSON.stringify(tweetdata),
        headers:{
          'Content-type':'application/json',
          "x-auth-token":localStorage.getItem('token')
        }
      })
      .then((res) =>{
        if(res.status == 200){
          return res.json();
        }

      throw new Error("Unauthorized");
      })
      .then(() => history.push("/home"))
      .catch((err) =>{
        history.push("/")
      })
    }

    const UpdateNewtweet = () =>{
      const tweetdata ={
        tweet:tweet
      }
      UpdateTweet(tweetdata);
    }

    


  return (
    <div className='AddTweetBackground'>
        <textarea 
        rows="4" 
        cols="50" 
        placeholder="What's happening?" 
        value={tweet} 
        onChange={(e) => setTweet(e.target.value)}
        ></textarea>

        <div className='AddTweetButtons'>
        <Button variant="contained" onClick={() => history.goBack()}>Cancel</Button>
        <Button variant="contained" onClick={() => UpdateNewtweet()}>Edit Tweet</Button>
        </div>
       
    </div>
  )
}