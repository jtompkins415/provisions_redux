import { useState, useEffect } from "react";
import axios from 'axios';

export function GetUserData(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers () {
        try {
            const usersData = await axios.get('/users');
            setUsers(usersData.data)
            console.log(users);
        } catch (err) {
            console.error('Error fetching users', err);
        }
        
        }
        fetchUsers();
}, []);

    return (
        <>
        {users.forEach((user) => (
                <>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>{user.first_name}</div>
                <div>{user.last_name}</div>
                </>   
            ))}
        </>
            
        
    )
}