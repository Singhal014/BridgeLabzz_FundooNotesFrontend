import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import './SideBar.scss'; 

const Sidebar = ({ isExpanded }) => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={isExpanded}
            className={isExpanded ? "sidebar-main expanded" : "sidebar-main collapsed"}
        >
            <List>
                <ListItem button onClick={() => navigate("/dashboard/notes")}>
                    <ListItemIcon><LightbulbOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Notes" />
                </ListItem>
                <ListItem button onClick={() => navigate("/dashboard/archive")}>
                    <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Archive" />
                </ListItem>
                <ListItem button onClick={() => navigate("/dashboard/trash")}>
                    <ListItemIcon><DeleteOutlineOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Trash" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
