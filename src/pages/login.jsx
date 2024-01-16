import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.css";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { actions, loginUser, selectIsAuth } from "../store/userSlice";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
    const isAuth = useSelector(state => state.userAccount.status)
    const dispatch = useDispatch()
    const nav = useNavigate()

    const {
        register,
        handleSubmit,
        formState:{errors,isValid}
    } = useForm({
        defaultValues:{
            email:'',
            password:''
        },
        mode:'onChange'
    })

    if(isAuth){
        return <Navigate to={'/home'}/>
    }

    const onSubmit = async (values)=>{

        const data = await dispatch(loginUser(values))

        if(!data.payload){
            return  alert('Error login')
        } else {
            dispatch(actions.getMe(data.payload))
            window.localStorage.setItem('user',JSON.stringify(data.payload))
            nav('/home')
        }

    }


    return (
        <div className={styles.wrapper}>
            <Paper styles={{}} classes={{ root: styles.root }}>
                <Typography classes={{ root: styles.title }} variant="h5">
                    Login account
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        className={styles.field}
                        label="E-Mail"
                        type={"email"}
                        color="secondary"
                        error={Boolean(errors.email?.message)}
                        {...register('email', { required : 'Enter email'})}
                        helperText={errors.email?.message}
                        fullWidth
                    />
                    <TextField
                        type={"password"}
                        className={styles.field}
                        label="Password"
                        fullWidth
                        color="secondary"
                        error={Boolean(errors.password?.message)}
                        {...register('password', { required : 'Enter password'})}
                        helperText={errors.password?.message}
                    />
                    <Button style={{backgroundColor:'#dc87fe'}} disabled={!isValid} type={"submit"} size="large" variant="contained" fullWidth>
                        Login
                    </Button>
                </form>
            </Paper>
        </div>
    );
};