import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../services/axiosInstance';

function AllUsers() {
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        const getAllUsers = async () =>{
            try{
                const response = await axiosInstance.get('/users');
                console.log(response);
                 
            }catch(error){
                console.log(error);
                
            }
        };
        getAllUsers()
    },[]);
  return (
    <div>AllUsers</div>
  )
}

export default AllUsers