import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'
import { AccountCircle } from '@mui/icons-material';
import { Box } from '@mui/system';
import ModalChangePassword from './ModalChangePassword';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loading, logout, notLoading } from '../../Redux/Feature/AuthSlice';
import { updateUser } from '../../Redux/Service/AuthService';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

const Navbar = ({ drawerWidth, handleDrawerToggle, setLoading }) => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [DetailData, setDetailData] = useState(null)
  const [modalEdit, setModalEdit] = useState(false)
  const users = useSelector((state) => state.login.res)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const openModalEdit = (row) => {
    setDetailData(row)
    setAnchorEl(null)
    setModalEdit(true)
  }

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('users')
    Navigate('/dashboard')
  }

  const changePassword = (data) => {
    setLoading(true)
    updateUser(users.id,{"nama": users.nama, "password": data}).then((res) => {
      toast.success('Berhasil Mengganti Password')
      setModalEdit(false)
      setLoading(false)
    }).catch((err) => {
      setModalEdit(false)
      toast.error(`Gagal Mengganti Password: ${err}`)
      setLoading(false)
    })
  }

  return (
    <>
      {modalEdit && <ModalChangePassword submit={changePassword} show={modalEdit} closeModal={() => setModalEdit(false)} obj={users} />}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" noWrap component="div" >
            {users?.nama}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            sx={{ mt: 4 }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={openModalEdit}>Ganti Password</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

    </>
  )
}

export default Navbar