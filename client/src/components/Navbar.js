import React,{useContext} from "react";
import { Link, useNavigate} from "react-router-dom";
import { UserContext } from "../App";


const Navbar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const renderList = ()=>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/myfollowingpost">My Following Posts</Link></li>,
        <li>
          <button className="logOutbtn btn #d50000 red accent-4" onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            navigate('/signin')
          }}>LogOut
                </button>
        </li>
      ]
    }else{
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
    return(
        <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Snapscape</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default Navbar