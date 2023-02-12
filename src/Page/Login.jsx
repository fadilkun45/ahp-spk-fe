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
        <div style={{ backgroundColor: "#3f51b5" }}>
            <Container sx={{ width: "45%", display: "flex", height: "100vh", alignItems: "center" }}>


                <Stack spacing={3} sx={{ width: "100%", p: "20px 10px", borderRadius: "10px", background: "#FFF" }}>
                    <Typography textAlign="center" sx={{ fontSize: "30px" }} component="h1">
                        
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter.typeString('Silahkan Login untuk masuk Kedalam Sistem')
                                    .pauseFor(250)
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
                        Simpan
                    </Button>
                </Stack>
            </Container>
        </div>
    )
}

export default Login