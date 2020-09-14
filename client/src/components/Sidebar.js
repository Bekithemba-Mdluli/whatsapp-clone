import React from 'react';
import "./Sidebar.css";

import { Avatar, IconButton } from "@material-ui/core";
import { DonutLarge, Chat, MoreVert, SearchOutlined } from "@material-ui/icons"
import SidebarChat from "./SidebarChat";
const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGuttoNPCy6sbji0Lx_zB2iIoZPihf3jIJXQ&usqp=CAU"/>
					<div className="sidebar__headerRight">
						<IconButton>
							<DonutLarge />
						</IconButton>
						<IconButton>
							<Chat />
						</IconButton>
						<IconButton>
							<MoreVert />
						</IconButton>
					</div>
			</div>

			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlined />
					<input type="text" placeholder="Search or start a new chat" />
				</div>
			</div>

			<div className="sidebar__chats">
				<SidebarChat />
			</div>

		</div>
	)

}
export default Sidebar;