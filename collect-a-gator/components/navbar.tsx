'use client';
import React from "react";
import { Typography, Grid, IconButton, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
	Menu,
	LibraryBooks,
	Home,
	Map
} from "@mui/icons-material";

function NavBar() {

    type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor : DrawerAnchor, open : any) => (event : any) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const iemsList = (anchor : DrawerAnchor) => (
		<Box
			sx={{
				width: anchor === "top" || 
					anchor === "bottom" ? "auto" : 250,
				backgroundColor: "#F7DBFF",
				height: '100%'
			}}
			role="drawer"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<Typography
				sx={{ textAlign: "center", pt: 4, 
					color: "purple", fontSize: 20 }}
			>
				Collect-A-Gator!
			</Typography>
			<List>
			</List>
			<Divider />
			<List>
				<ListItemButton sx={{ color: "white" }} href="../">
					<ListItemIcon sx={{ color: "white" }}>
						{<Home />}
					</ListItemIcon>
					<ListItemText primary={"Home"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }} href="../journal">
					<ListItemIcon sx={{ color: "white" }}>
						{<LibraryBooks />}
					</ListItemIcon>
					<ListItemText primary={"Journal"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }} href="../map">
					<ListItemIcon sx={{ color: "white" }}>
						{<Map />}
					</ListItemIcon>
					<ListItemText primary={"Map"} />
				</ListItemButton>
			</List>
			<Divider />
			<List>
			</List>
			<Typography
				sx={{
					backgroundColor: "white",
					borderRadius: 10,
					textAlign: "center",
					padding: 1,
					margin: 2,
				}}
			>
				<Button href="../login" sx={{color: "purple"}}>Sign In</Button>
			</Typography>
		</Box>
	);

	return (
		<Grid container direction="row">
			<Grid item>
				<React.Fragment key={"left"}>
					<IconButton onClick={toggleDrawer("left", true)}><Menu/></IconButton>
					<Drawer
						anchor={"left"}
						open={state["left"]}
						onClose={toggleDrawer("left", false)}
					>
						{iemsList("left")}
					</Drawer>
				</React.Fragment>
			</Grid>
			<Grid item>
				<Typography paddingTop="8px">
					Collect-A-Gator
				</Typography>
			</Grid>
		</Grid>
	);
}

export default NavBar;

// TAKEN FROM https://www.geeksforgeeks.org/react-mui-drawer-navigation/