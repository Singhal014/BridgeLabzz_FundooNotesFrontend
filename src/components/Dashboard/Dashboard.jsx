import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import "./DashBoard.scss";

const DashBoard = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

    return (
        <>
            <CssBaseline />
            <NavBar toggleSidebar={toggleSidebar} />

            <Box className="dashboard-container">
                <Sidebar isExpanded={isSidebarExpanded} />
                <Box className={`content ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default DashBoard;
