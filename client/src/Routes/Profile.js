import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import Navbar from './Navbar';
import '../CSS/Navbar_Page.css'
import '../CSS/Profile.css';


export default function Profile() {
  const id = localStorage.getItem("Id");
  const name = localStorage.getItem("Name");
  const last = localStorage.getItem("Last");
  const email = localStorage.getItem("Email");
  const username = localStorage.getItem("Username");
  const history = useHistory();

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

      throw new Error("Unauthorized")
    })
    .then((data) => {
      setData(data)
      
    })
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
       <div className='Profile'>
         <h1>Your Profile</h1>
         <p>First Name: {name}</p>
         <p>Last Name: {last}</p>
         <p>Email: {email}</p>
         <p>Username: {username}</p>
       </div>
      
    </div>

       
        
      
   
  )
}
