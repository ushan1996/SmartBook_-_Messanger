import './sidebar.css'
import {RssFeed,PlayCircleFilledOutlined,Group,Bookmark,HelpOutline,WorkOutline,Event,School,Message} from "@material-ui/icons"
import { Users } from "../../dummyData"
import CloseFriend from '../closeFriend/CloseFriend'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios";
export default function Sidebar({user}) {
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <Link to="/messanger" style={{textDecoration:"none" , color:"black" }}>
          <li className="sidebarListItem">
            <Message className="sidebarIcon" />
            <span className="sidebarListItemText">Message</span>
          </li>
          </Link>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Video</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className='sidebarButton'>Show More</button>
        <hr  className='sidebarHr'/>
        <ul className="sidebarFriendList">
        {friends.map((friend) => (
            <Link to={"/profile/"+friend.username} style={{ textDecoration: "none" , color: "black"}}>
                <div className="sidebarFriend "> 
                    <img src={friend.profilePicture ? PF+friend.profilePicture: PF+"person/no.jpg"} alt="" className="sidebarFriendImg"/>
                     <span className="sidebarFollowingName">{friend.username}</span>
                 </div>
            </Link>
             

          ))}
        </ul>
      </div>
    </div>
  )
}
