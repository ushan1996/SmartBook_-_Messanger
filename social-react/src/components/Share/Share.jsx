import "./share.css"
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom";
import axios from "axios";
export default function Share() {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file,setFile] = useState(null);
    const submitHandler = async (e) =>{
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(file){
            const data = new FormData();
            //const fileName = Date.now()+ file.name;
            const fileName = file.name;
            data.append("file",file);
            data.append("name",fileName);
            newPost.img = fileName;
            try{
                await axios.post("/upload",data);
            }catch(err){
                console.log(err)
            }
        }
        try{
            await axios.post("/posts",newPost);
            window.location.reload()
        }catch(err){}
    };
  return (
    <div className="share">
        <div className="shareWrapper">
        <div className="shareTop">  
        <Link to={`profile/${user.username}`}>
                <img src={user.profilePicture ? PF + user.profilePicture : PF+"person/no.jpg"} alt="" className="shareProfileImg" />
                </Link>
        
        <input placeholder={"What's in your mind "+user.username+"?"} className="shareInput" ref={desc}/>
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <label htmlFor="file" className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:"none"}} type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e)=>setFile(e.target.files[0])}/>
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </label>
            <button className="shareButton" type="submit">Share</button>
        </form>
    </div>
    </div>
    
  )
}
