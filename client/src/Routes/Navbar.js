import React from 'react'
import {Link,useHistory} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import '../CSS/App.css';

export default function Navbar() {
  const history = useHistory();
  const clearLocalStorage = () =>{
    localStorage.clear()
    history.push("/")
  }
  return (
    <div>
    <nav className='nav'>
        <ul className="navbar">
        <li className="link1"><Link to="/home" className="link">Tweeter Clone</Link></li>
        <li className='li'><Link to="/home" className="link"><HomeIcon color="primary" sx={{ fontSize: 20 }}/> Home</Link></li>
        <li className='li'><Link to="/profile" className="link"><PersonIcon color="primary" sx={{ fontSize: 20 }}/> Profile</Link></li>
        <li className='li'><Button variant="contained" onClick={() => clearLocalStorage()}>Logout</Button></li>
        </ul>
    </nav>
    </div>
  )
}
