import React from 'react'
import '../CSS/Home.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red,blue,purple } from '@mui/material/colors';
import {
   
  useHistory
} from "react-router-dom";

export default function TweetDesign({data,deleteTweet,getData}) {
  const history = useHistory();
  const id = localStorage.getItem("Id");

  const UpdateLike = (id) =>{
    fetch(`http://localhost:9000/tweeter/likepost/${id}`,{
        method:'PUT',
        headers:{
            'Content-type':'application/json',
            "x-auth-token":localStorage.getItem("token")
        }
    })
    .then((data) => data.json)
    .then(() => getData())
    .catch((err) => console.log(err))
}

  return (
    <div className="TweetCard">
        <h3 onClick={() => history.push(`/ViewProfile/${data.creatorId}`)}>{data.name}</h3>
        <p>{data.tweet}</p>
        <div className="icons">
            <ThumbUpIcon  sx={{ color: blue[900] }} onClick={() => UpdateLike(data._id)}/>{data.likes.length}
            <ThumbDownIcon sx={{ color: blue[900] }}/>
            {id == data.creatorId ?
              <div>
                  <EditIcon onClick={() => history.push(`/edittweet/${data._id}`)} sx={{ color: purple[900] }}/>
                  <DeleteIcon onClick={() => deleteTweet(data._id)} sx={{ color: red[900] }}/>
              </div>
              : ''
            }
        </div>
    </div>
  )
}
