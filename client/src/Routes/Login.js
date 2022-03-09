import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import '../CSS/Login.css';

export default function Login() {
  const [user,setUser] = useState('');
  const [pass,setPass] = useState('');

  const history = useHistory();

  const Login = (data) =>{
    fetch('http://localhost:9000/tweeter/login',{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-type":"application/json"
      }
    })
    .then((data) => data.json())
    .then((data) => {
      localStorage.setItem("token",data.token)
      localStorage.setItem("Name",data.name)
      localStorage.setItem("Last",data.last)
      localStorage.setItem("Username",data.username)
      localStorage.setItem("Email",data.email)
      localStorage.setItem("Id",data.id)
      history.push("/home")
    })
  }


  const LoginData = () =>{
    const Data = {
      username:user,
      password:pass
    }

    Login(Data)
  }
  return (
    <div className='FormDetails'>
      <h1>Tweeter Clone</h1>
      <input placeholder='Enter Username' value={user} onChange={(e) => setUser(e.target.value)}/>
      <input placeholder='Enter Password' value={pass} onChange={(e) => setPass(e.target.value)}/>
      <button onClick={() => LoginData()}>Login</button>
      <p><a onClick={() => history.push('/signup')}>Dont have an Account? SignUp</a></p>
    </div>
  )
}
