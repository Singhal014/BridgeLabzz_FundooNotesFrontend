import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Typography } from "@mui/material";
import {  AccountCircle as AccountIcon, Search as SearchIcon } from "@mui/icons-material";
import "./Navbar.scss";
import { UpdateSearchQuery } from "../../App";



const Navbar = () => {
  const updateSearchQuery = useContext(UpdateSearchQuery)
  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        <Typography variant="h6" className="logo">
          Fundoo
        </Typography>
        <div className="search" >
          <SearchIcon />
          <InputBase placeholder="Search notes..." onChange={(e)=>updateSearchQuery(e.target.value)} />
        </div>
        <IconButton color="inherit">
          <AccountIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
