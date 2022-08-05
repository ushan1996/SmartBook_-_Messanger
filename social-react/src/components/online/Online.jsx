import "./online.css"

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
            <div className="rightbarProfileImageContainer">
              <img src={PF+user.profilePicture} alt="" className="rightbarProfileImages" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUserName">{user.username}</span>
          </li>
  )
}
