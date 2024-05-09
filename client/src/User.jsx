import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function User(){
    const qwe=localStorage.getItem('email')
    const [users,setUser] = useState([{
        Name:"Tamil",Email:"tamil123@gmail.com",Age:20
    }])
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:3001/users')
        .then(result => setUser(result.data))
        .catch(err => console.log(err))
    },[])

   useEffect(()=>{
   const fin=()=>{
    if(!qwe){
        navigate('/')
    }
   }
   fin()
   },[])

     const handledelete=(id)=>{
        
        axios.delete('http://localhost:3001/deleteUser/'+id)
        .then(res => console.log(res))
        .catch(errr => console.log(errr))
        navigate('/user')
     }
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className="btn btn-success">Add+</Link>
                <h1><span>Session:-</span>{qwe}</h1>
            <table className= 'table'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Mobile</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user)=>{
                        return <tr>
                             <td>{<img src={`http://localhost:3001/img/${user.image}`} width={50} height={40} />}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.mobile}</td>
                            <td>
                            <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                                <button className="btn btn-danger" onClick={(e)=>handledelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
            </table>
            </div>
        </div>
    )
}
export default User;