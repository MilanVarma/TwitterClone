import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import '../CSS/TwitterNav.css'

export default function TwitterLogoNavbar() {
  return (
    <nav className='Twitternav'>
        <ul>
            <li><TwitterIcon color="primary" sx={{ fontSize: 37 }}/></li>
        </ul>
    </nav>
  )
}
