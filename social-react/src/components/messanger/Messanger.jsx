import Conversation from "../conversation/Conversation"
import Message from "../message/Message"
import ChatOnline from "../chatOnline/ChatOnline"
import Topbar from "../topbar/Topbar"
import "./messanger.css"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";
import { SpaRounded } from "@material-ui/icons";
import {io} from "socket.io-client";
export default function Messanger() {
    const[conversations , setConversations] = useState([]);
    const[currentChat , setCurrentChat] = useState(null);
    const[messages , setMessages] = useState([]);
    const[newMessages , setNewMessages] = useState("");
    const[arivalMessage , setArivalMessage] = useState(null);
    const[onlineUsers , setOnlineUsers] = useState([]);
    const socket = useRef();
    const {user} = useContext(AuthContext);
    
    const scrollRef = useRef();
    
    useEffect(()=>{
       socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage",data =>{
            setArivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })

    },[])
 
    useEffect(()=>{
        arivalMessage && currentChat?.members.includes(arivalMessage.sender) &&
        setMessages((prev) => [...prev, arivalMessage]);
    },[arivalMessage, currentChat]);

    useEffect(()=>{
        socket.current.emit("addUser",user._id);
        socket.current.on("getUsers",(users)=>{
            setOnlineUsers(
                user.following.filter((f) => users.some((u) => u.userId === f)));
        });
    },[user])
  
    useEffect(()=>{
        const getConversations = async ()=>{
            try{
                const res = await axios.get("/conversations/"+user._id);
                setConversations(res.data)
            }catch(err){
                console.log(err);
            }
           
        };
        getConversations();
    },[user._id]);
    useEffect(()=>{
        const getMessages = async ()=>{
            try{
            const res = await axios.get("/messages/"+ currentChat?._id);
            setMessages(res.data);
            }catch(err){
                console.log(err);
            }
        };
        getMessages();
    },[currentChat?._id]);

    const hadleSubmit = async (e)=>{
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessages,
            conversationId: currentChat._id,
        };
        const receiverId = currentChat.members.find(member=> member !== user._id)
        socket.current.emit("sendMessage",{
            senderId:user._id,
            receiverId,
            text: newMessages
        })
        try{
            const res = await axios.post("/messages",message);
            setMessages([...messages,res.data])
        }catch(err){
            console.log(err);
        }
    };

    

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({bahavior: "smooth"});
    },[messages])
  return (
    <>
        <Topbar />
        <div className="messanger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search For Friends" className="charMenuInput" />
                    {conversations.map((c,i) => (
                        <div onClick={()=>setCurrentChat(c)}>
                         <Conversation conversation={c} currentUser={user} key={i}/>
                        </div>
                    ))}
                   

                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ? 
                   <>
                    <div className="chatBoxTop">
                        {messages.map((m,k) => (
                            <div ref={scrollRef}>
                                <Message  message={m} own={m.sender === user._id}  key={k}/>
                            </div>
                        ))}

                    </div>
                    <div className="chatBoxBottom">
                        <textarea 
                        placeholder="Write Something ..." 
                        className="chatMessageInput"
                        onChange={(e)=>setNewMessages(e.target.value)}
                        value={newMessages}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={hadleSubmit}>Send</button>
                    </div></> : (<span className="noConvasationText">Open a conversation to start a chat.</span> )}
                </div>
            </div>
            <div className="chatOnline">
                <div>
                    <h3 className="onlinefriendschecking">Online Friends</h3>
                </div>
                <div className="chatOnlineWrapper">
                    <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                </div>
            </div>
        </div>
    </>
   
  )
}
