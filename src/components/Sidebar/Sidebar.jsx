import React from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Lightbulb as NotesIcon, Archive as ArchiveIcon, Delete as TrashIcon } from "@mui/icons-material";
import "./Sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" anchor="left" className="sidebar">
      <List>
        <ListItem button onClick={() => navigate("/dashboard/notes")}>
          <NotesIcon className="icon" />
          <ListItemText primary="Notes" />
        </ListItem>
        <ListItem button onClick={() => navigate("/dashboard/archive")}>
          <ArchiveIcon className="icon" />
          <ListItemText primary="Archive" />
        </ListItem>
        <ListItem button onClick={() => navigate("/dashboard/trash")}>
          <TrashIcon className="icon" />
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;