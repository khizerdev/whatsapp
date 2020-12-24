import { Avatar } from '@material-ui/core'
import React , {useState , useEffect } from 'react'
import './SidebarChat.css'
import db from '../firebase'
import { Link } from 'react-router-dom';

function SidebarChat({addNewChat , id , name}) {

    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const createChat = () => {
        const roomName = prompt('Please Enter Name For You Chat')

        if(roomName){
            db.collection("rooms").add({
                name: roomName
            })
        }
    }

    useEffect(() => {
        if(id){
            db.collection("rooms").doc(id).collection('messages').orderBy('timestamp' , 'desc')
            .onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, []);

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div> 
        </Link>
        ) : (
            <div onClick={createChat} className="sidebarChat">
                <h2>Add New Chat</h2>
            </div>
        )
}

export default SidebarChat
