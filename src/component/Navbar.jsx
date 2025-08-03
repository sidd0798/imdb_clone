
// rfce
import React from 'react'
import Logo from '../film-slate.png'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div className="border flex 
    
    item-center 
    space-x-8 
    pl-3 py-4" 
   
    >
   <img className="   w-[50px]"src={Logo} alt=""  />
    <Link to="/" className=" text-xl m-0 p-5 leading-none h-[2em] text-blue-400 font-bold">Movies</Link>
    <Link to="/fav" className="text-xl m-0 p-5 eading-none h-[2em] text-blue-400 font-bold">Favourites</Link>
    


    </div>
  )
}

export default Navbar