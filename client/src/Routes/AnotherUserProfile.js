import React,{useState,useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom';
import Navbar from './Navbar';
import '../CSS/Navbar_Page.css'
import '../CSS/Profile.css';


export default function AnotherUserProfile() {
 
  const history = useHistory();
  const {id} = useParams();
  const username = localStorage.getItem("Username")

  const [user,setData] = useState([]);

  const getData = (id) =>{
    fetch(`http://localhost:9000/tweeter/SingleUser/${id}`,{
      method:"GET",
      headers:{
        'x-auth-token':localStorage.getItem("token")
      }
    })
    .then((res) =>{
      if(res.status == 200){
        return res.json()
      }

      throw new Error("unauthorized")
    })
    .then((data) => setData(data))
    .catch((err) =>{
      console.log(err)
      history.push("/")
    })
  }

  useEffect(() =>{
    getData(id);

  },[])
  return (
    <div className='NavPage'>
        <Navbar />
       {username==user.username ? history.push("/profile")
       :<div className='Profile'>
        <h1>{user.firstname}'s Profile</h1>
         <p>First Name: {user.firstname}</p>
         <p>Last Name: {user.lastname}</p>
         <p>Email: {user.email}</p>
         <p>Username: {user.username}</p>
       </div> }
      
    </div>

       
        
      
   
  )
}
