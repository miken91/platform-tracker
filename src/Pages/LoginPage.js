import React, { useContext, useState } from 'react';
import ApplicationContext from '../ApplicationContext';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import AppBarComponent from '../Components/AppBarComponent';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    buttonStyles : {
        marginTop: "1em",
    },
    linkStyles : {
        marginTop: "1em",
        "&:hover" : {
        backgroundColor : "transparent"
        }
    }, gridItems : {
        width: "20%"
    }
}));

function LoginPage() {
    const [loginState, setLoginState] = useState('Login')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();
    const handleChange = (event) =>{
        if(event.target.type === "email") {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }
    const attemptLogin = () => {
        axios.post('https://platform-tracker.herokuapp.com/users/login', {email: email, password: password}).then(response => {
            setToken(response);
        }
    )
    }

    const {token, setToken } = useContext(ApplicationContext)
    return (
        <React.Fragment>
            <AppBarComponent/>
            <Container>
                {loginState === "Login" ? 
                <Grid container direction="column" alignItems="center">
                    <Grid item className={classes.gridItems}>
                        <h1>Login</h1>
                    </Grid>
                    <Grid item className={classes.gridItems}>
                        <h3>Email</h3>
                        <TextField type="email" input={email} onInput={handleChange} placeholder="example@email.com"></TextField>
                    </Grid>
                    <Grid item className={classes.gridItems}>
                        <h3>Password</h3>
                        <TextField type="password" input={password} onInput={handleChange} placeholder="**********"></TextField>
                    </Grid>
                    <Grid item className={classes.gridItems}>
                        <Button className={classes.buttonStyles} fullWidth variant="contained" onClick={attemptLogin}>Login</Button>
                    </Grid>
                    <Grid item className={classes.gridItems}>
                        <Button className={classes.linkStyles} onClick={()=> {setLoginState('CreateUser')}}>Create an account</Button>
                    </Grid>
                </Grid> : 
                <Grid container direction="column" alignItems="center">
                <Grid item className={classes.gridItems}>
                    <h1>Create Account</h1>
                </Grid>
                <Grid item className={classes.gridItems}>
                    <h3>Email</h3>
                    <TextField type="email" input={email} onInput={handleChange} placeholder="example@email.com"></TextField>
                </Grid>
                <Grid item className={classes.gridItems}>
                    <h3>Password</h3>
                    <TextField type="password" input={password} onInput={handleChange} placeholder="**********"></TextField>
                </Grid>
                <Grid item className={classes.gridItems}>
                    <Button className={classes.buttonStyles} fullWidth variant="contained" onClick={attemptLogin}>Login</Button>
                </Grid>
                <Grid item className={classes.gridItems}>
                    <Button className={classes.linkStyles} onClick={()=> {setLoginState('Login')}}>Already have an account? Sign in</Button>
                </Grid>
            </Grid> }
            </Container>
        </React.Fragment>
    )
}

export default LoginPage;