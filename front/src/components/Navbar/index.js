import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useEffect, useState} from 'react';

const Navbar = () => {

    const [menuAberto, setMenuAberto] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    const Logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/login"
    }

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 0) {
            setScrolling(true);
          } else {
            setScrolling(false);
          }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);    

    return(
        <>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    PWI
                </Typography>
                <Button onClick={Logout} color="inherit">Sair</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;