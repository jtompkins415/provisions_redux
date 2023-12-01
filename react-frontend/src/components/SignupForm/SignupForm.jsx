import { redirect } from 'react-router-dom';
import {useState} from 'react';
import {Box, TextField } from '@mui/material';
import './SignupForm.css';



function SignupForm ({signup}){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        const signupResults = await signup(username, email, password, first_name, last_name, city, state);

        console.log(signupResults.success);
        redirect('/home');
    }
    

    return (
        <div id='signup-form-container'>
            <div id="background-color">
                <div id='form-title-container'>
                    <h2 id='form-title'>Sign Up</h2>
                    <h3 id='form-subtitle'>Sign up for order tracking, loyalty points, & more...</h3>
                </div>
                <Box component='form' id='login-form' onSubmit={handleSubmit}>
                    <div id="form-input-containers">
                        <TextField required className='form-input' label='First Name' value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                        <TextField required className='form-input' label='Last Name' value={last_name} onChange={(e) => setLastName(e.target.value)} />
                        <TextField required className='form-input' label='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <TextField required className='form-input' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField required className='form-input' label='Password' vaule={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField required className='form-input' label='City' vaule={city} onChange={(e) => setCity(e.target.value)} />
                        <TextField required className='form-input' label='State' vaule={state} onChange={(e) => setState(e.target.value)} />
                        <button type='submit' id='login-submit'>Submit</button>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default SignupForm;