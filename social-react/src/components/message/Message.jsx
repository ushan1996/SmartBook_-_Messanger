import "./message.css"
import axios from "axios";
import {format} from "timeago.js"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Message({message,own}) {
  const [friend,setFriend] = useState(null) ;
  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const friendId = message.sender;
   
    const getFreind = async () =>{
        try{
          const res = await axios("/users?userId="+friendId);
        setFriend(res.data);
        console.log(res.data)
        }catch(err){
          console.log(err)
        }
        
      };
      getFreind();
  },[message])
  
  
  return (
    <div className={own ? "message own":"message"}>
        <div className="messageTop">
            <img src={own ?PF+friend?.profilePicture: PF+friend?.profilePicture } alt="" className="messageImage" /> 
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
