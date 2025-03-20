import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import "./SideBar.scss";

const Sidebar = ({ isExpanded }) => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            className={`sidebar-main ${isExpanded ? "expanded" : "collapsed"}`}
            classes={{ paper: `sidebar-main ${isExpanded ? "expanded" : "collapsed"}` }}
        >
            <List>
                <ListItem button onClick={() => navigate("/dashboard/notes")}>
                    <ListItemIcon>
                        <LightbulbOutlinedIcon />
                    </ListItemIcon>
                    {isExpanded && <ListItemText primary="Notes" />}
                </ListItem>

                <ListItem button onClick={() => navigate("/dashboard/archive")}>
                    <ListItemIcon>
                        <ArchiveOutlinedIcon />
                    </ListItemIcon>
                    {isExpanded && <ListItemText primary="Archive" />}
                </ListItem>

                <ListItem button onClick={() => navigate("/dashboard/trash")}>
                    <ListItemIcon>
                        <DeleteOutlineOutlinedIcon />
                    </ListItemIcon>
                    {isExpanded && <ListItemText primary="Trash" />}
                </ListItem>
            </List>
            <Divider />
        </Drawer>
    );
};

export default Sidebar;