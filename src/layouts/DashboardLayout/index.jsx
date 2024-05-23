import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { googleLogout } from '@react-oauth/google';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import NavMenu from '../../components/NavMenu';
import { logout } from '../../Redux/slices/authSlice';
import { authUserDataSelector, resetAuthUser } from '../../Redux/slices/authUserSlice';
const drawerWidth = 240;

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const { name, email, picture } = useSelector(authUserDataSelector)

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClick = () => {
    setOpen(!open);
  };

  const handleLogOutClick = () => {
    googleLogout();
    dispatch(logout());
    dispatch(resetAuthUser());
    handleUserClose();
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton onClick={handleDrawerClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <div>
              <Avatar
                alt={name}
                src={picture}
                onClick={handleUserClick}
                sx={{ cursor: "pointer" }}
                title={email}
              />

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserClose}
              >
                {/* <MenuItem onClick={handleUserClose}>Profile</MenuItem> */}
                {/* <MenuItem onClick={handleUserClose}>Settings</MenuItem> */}
                <MenuItem onClick={handleLogOutClick}>Logout</MenuItem>
              </Menu>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: open ? drawerWidth : 0, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <NavMenu />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}