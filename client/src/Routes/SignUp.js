import React,{useState} from 'react'
import {useHistory} from 'react-router-dom';
import '../CSS/Login.css';

export default function SignUp() {
  const [firstname,setFirst] = useState('');
  const [lastname,setLast] = useState('');
  const [email,setEmail] = useState('');
  const [user,setUser] = useState('');
  const [pass,setPass] = useState('');

  const history = useHistory();

  const Signup = (data) => {
    
    fetch('http://localhost:9000/tweeter/addUser',{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        'Content-type':'application/json'
      }
    })
    .then((data) => data.json())
    .then(() => history.push('/'))

  }

  const SignupDetails = () =>{
    const data = {
      firstname:firstname,
      lastname:lastname,
      email:email,
      username:user,
      password:pass

    }

    Signup(data)
  }

  return (
    <div className='FormDetails'>
      <h1>Tweeter Clone</h1>
      <input placeholder="First Name" value={firstname} onChange={(e) => setFirst(e.target.value)}/>
      <input placeholder="Last Name" value={lastname} onChange={(e) => setLast(e.target.value)}/>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)}/>
      <input placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}/>
      <button onClick={() => SignupDetails()}>Sign Up</button>
     
    </div>
  )
}
