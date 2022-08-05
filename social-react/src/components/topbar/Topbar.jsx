import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import {Link} from "react-router-dom"
import { useContext } from "react"
import {AuthContext} from "../../context/AuthContext"
export default function Topbar() {
  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let logoutoption = JSON.parse(localStorage.getItem('user'));
  console.log(logoutoption)
  function logout(){
    localStorage.clear();
    window.location.reload()

  }
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">SmartBook</span>
          </Link>
         
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="SearchIcon"/>
            <input placeholder="Search for friend, post or video" className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
          <Link to="/" style={{textDecoration:"none" , color:"white"}}>
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink" onClick={logout}>Logout </span>
          </Link>
          </div>
          <div className="topbarIcons">
             <div className="topbarIconItem">
              <Person />
                <span className="topbarIconBadge">1</span>
             </div>
             <Link to="/messanger" style={{textDecoration:"none" , color:"white" }}>
             <div className="topbarIconItem">
              <Chat />
                <span className="topbarIconBadge">2</span>
             </div>
             </Link>
             <div className="topbarIconItem">
              <Notifications />
                <span className="topbarIconBadge">8</span>
             </div>
          </div>
          <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/no.jpg"} alt="" className="topbarImg" />
          </Link>
          
        </div>
    </div>
  )
}
