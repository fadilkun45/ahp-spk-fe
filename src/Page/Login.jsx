import { Button, Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Container, Stack } from '@mui/system'
import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginUser } from '../Redux/Service/AuthService'
import Typewriter from 'typewriter-effect';


import React from 'react'
import { Box } from '@mui/joy'
import { Image } from '@mui/icons-material'

const Login = ({setLoading}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.login)

    const [form, setForm] = useState({
        email: '',
        kataSandi: ''
    })

    useLayoutEffect(() => {
        if(user.res){
         return  navigate('/dashboard')
        }
    },[])

    const onSubmit = () => {
        setLoading(true)
        dispatch(LoginUser(form)).then((res) => {
            if (!res.error) {
                setLoading(false)
                navigate('/dashboard')
            } else {
                setLoading(false)
                toast.error(res.payload.message)
            }
        })
    }

    return (
        <div style={{ backgroundColor: "#3f51b5"}}>
            <Stack direction="row" sx={{height: "100vh", overflowY: "hidden"}}>
            <Box sx={{width: "50%", height: "auto"}}/>
            <Stack  sx={{ width: "50%", p: "20px 10px", height: "100%", justifyContent: "center", background: "#FFF" }}>
                    <img width="250px"  style={{margin: "0 auto" , marginTop: "-100px"}} src='https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/d7543d6bdd24cd45a0ba5fbef988a0da.jpg' />
                    <Stack spacing={3} sx={{width: "78%", margin: "0 auto", marginTop: "rem"}}>
                    <Typography textAlign="center" sx={{ fontSize: "20px" }} component="p" variant="h5">
                        
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter.typeString('Silahkan Login untuk masuk Kedalam Sistem')
                                    .pauseFor(340)
                                    .deleteAll()
                                    .start()
                                    .typeString('Selamat Datang')
                                    .pauseFor(550)
                                    .deleteAll()
                                    .start();
                            }}

                            options={{loop: true}}
                        />

                    </Typography>

                    <TextField id="standard-basic" onChange={(v) => setForm({ ...form, email: v.target.value })} label="Email" variant="standard" />
                    <TextField id="standard-basic" onChange={(v) => setForm({ ...form, kataSandi: v.target.value })} type="password" label="Password" variant="standard" />
                    <Button variant="contained" onClick={onSubmit} color="primary">
                        Masuk
                    </Button>
                    </Stack>
                </Stack>
            </Stack>
       
            {/* <Container sx={{ width: "45%", display: "flex", , alignItems: "center" }}>


              
            </Container> */}
        </div>
    )
}

export default Login