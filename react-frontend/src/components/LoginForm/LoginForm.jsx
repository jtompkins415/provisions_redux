import {useState, useEffect} from 'react';
import {Box, TextField, Button } from '@mui/material';


function LoginForm (){
    return (
        <div id='login-form-container'>
            <Box component='form' id='login-form'>
                <div id="form-input-containers">
                    <TextField required className='form-input' label='username' defaultValue='Username' />
                    <TextField required className='form-input' label='password' defaultValue='Password' />
                    <button type='submit'>LOGIN</button>
                </div>
            </Box>
        </div>
    )
}

export default LoginForm;