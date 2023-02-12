import { Box } from '@mui/system'
import React from 'react'
import { HashLoader } from 'react-spinners';

const LoadingScreen = () => {
    return (
        <Box sx={{ zIndex: "100000", backgroundColor: '#FFF', opacity: '0.8', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', position: "absolute", background: "" }}>
            <HashLoader size="100" color="#1976d2" />
        </Box>
    )
}

export default LoadingScreen