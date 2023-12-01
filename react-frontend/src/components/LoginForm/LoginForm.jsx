import { redirect } from 'react-router-dom';
import {useState} from 'react';
import {Box, TextField } from '@mui/material';
import './LoginForm.css';



function LoginForm ({login}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        const loginResults = await login(username, password);

        console.log(loginResults.success);
        redirect('/home');
    }
    

    return (
        <div id='login-form-container'>
            <div id="background-color">
                <div id='form-title-container'>
                    <h2 id='form-title'>Login</h2>
                </div>
                <Box component='form' id='login-form' onSubmit={handleSubmit}>
                    <div id="form-input-containers">
                        <TextField required className='form-input' label='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <TextField required className='form-input' label='password' vaule={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type='submit' id='login-submit'>Submit</button>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default LoginForm;