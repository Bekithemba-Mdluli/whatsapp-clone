import React, {useState} from 'react';
import { IconButton, Avatar } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Mic } from "@material-ui/icons";
import axios from "../axios";



import "./Chat.css";


const Chat = ({ messages }) => {
	const [input, setInput] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();

		await axios.post("/api/v1/messages/new", {
			message: input,
			name: "Test",
			timestamp: "Just now!",
			received: true,
		})
	}

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar />

				<div className="chat__headerInfo">
					<h3>Room name</h3>
					<p>Last seen at...</p>
				</div>

				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{messages.map((message) => (
					<p className={`chat__message ${message.received && "chat__reciever"}`}>
						<span className="chat__name">{message.name}</span>
						{message.message }
						<span className="chat__timestamp">
							{message.timestamp}
						</span>
					</p>
				))}
			</div>

			<div className="chat__footer">
				<InsertEmoticon />
				<form>
					<input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
					<button type="submit" onClick={sendMessage}>send a message </button>
				</form>
				<Mic />
			</div>
		</div>
	)

}
export default Chat;