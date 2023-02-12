import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from './Menu/MenuItem';
import Navbar from './Menu/Navbar';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/Loading';
const drawerWidth = 260;


const PrivateRoute = ({ window, children }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const user = useSelector((state) => state.login)
    const navigate = useNavigate()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;


    if (!user.res) {
        return <Navigate to="/login" />
    }


    return (
        <>
            {loading && <LoadingScreen />}

            {user.isLoading && <LoadingScreen />}

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <Navbar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} setLoading={setLoading} />

                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >

                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        <MenuItem />
                    </Drawer>

                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        <MenuItem />
                    </Drawer>
                </Box>

                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    { children }
                </Box>
            </Box>
        </>
    );

}

export default PrivateRoute