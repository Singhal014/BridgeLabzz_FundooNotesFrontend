    import React, { useState, useContext, useCallback } from 'react';
    import { AppBar, Toolbar, IconButton } from '@mui/material';
    import MenuIcon from '@mui/icons-material/Menu';
    import SearchIcon from '@mui/icons-material/Search';
    import RefreshIcon from '@mui/icons-material/Refresh';
    import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
    import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
    import AppsIcon from '@mui/icons-material/Apps';
    import AccountCircleIcon from '@mui/icons-material/AccountCircle';
    import { debounce } from 'lodash';
    import { UpdateSearchQuery } from '../../App'; 
    import keepLogo from "../../assets/keep.png"; 

    import './NavBar.scss';

    const NavBar = ({ toggleSidebar }) => {
        const setSearchQuery = useContext(UpdateSearchQuery); 
        const [searchInput, setSearchInput] = useState("");

        const debouncedSearch = useCallback(
            debounce((query) => {
                setSearchQuery(query); 
            }, 1200),
            [setSearchQuery]
        );

        const handleSearchChange = (e) => {
            setSearchInput(e.target.value);
            debouncedSearch(e.target.value);
        };

        return (
            <AppBar position="static" className="navbar-main">
                <Toolbar className="navbar-toolbar">
                    <IconButton className="navbar-menuIcon" onClick={toggleSidebar}>
                        <MenuIcon />
                    </IconButton>

                    <img src={keepLogo} alt="Fundoo Logo" className="logo" />

                    <span className="navbar-title">Fundoo</span>

                    <div className="navbar-search">
                        <SearchIcon className="navbar-searchIcon" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="navbar-input"
                            value={searchInput}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="navbar-icons">
                        <IconButton><RefreshIcon /></IconButton>
                        <IconButton><ViewAgendaOutlinedIcon /></IconButton>
                        <IconButton><SettingsOutlinedIcon /></IconButton>
                        <IconButton><AppsIcon /></IconButton>
                        <IconButton><AccountCircleIcon /></IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        );
    };

    export default NavBar;