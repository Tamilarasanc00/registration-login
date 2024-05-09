import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser(){

    const [name,SetName] = useState()
    const [email,SetEmail] = useState()
    const [age,SetAge] = useState()
    const [mobile,SetMobile] = useState()
    const [file,setFile] = useState()
    
   // const [file,SetFile] = useState()
    const navigate = useNavigate()

    const Submit = (e) =>{
        e.preventDefault();
        //console.log(mobile);
        const formdata = new FormData()
        
        formdata.append('name',name)
        formdata.append('age',age)
        formdata.append('mobile',mobile)
        formdata.append('email',email)
        //alert(file);
        formdata.append('file',file)

        axios.post('http://localhost:3001/upload',formdata)
        .then(result => {console.log(result)
            navigate('/user')
            })
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
    <div className="bg-white p-3 rounded w-25">
    <h2>Add User</h2>
    <form onSubmit={Submit}>
    <div className="mb-3">
    <label htmlFor="email">
    <strong>Name</strong>
    </label>
    <input type="text" placeholder="Enter Name" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e)=> SetName(e.target.value)}/>
    </div>
    <div className="mb-3">
    <label htmlFor="email">
    <strong>Email</strong>
    </label>
    <input type="email" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e)=> SetEmail(e.target.value)}/>
    </div>
    <div className="mb-3">
    <label htmlFor="email">
    <strong>Age</strong>
    </label>
    <input type="text" placeholder="Enter Age" name="age" className="form-control rounded-0" onChange={(e)=> SetAge(e.target.value)}/>
    </div>

    <div className="mb-3">
    <label htmlFor="email">
    <strong>Mobile</strong>
    </label>
    <input type="text" placeholder="Enter Mobile" name="mobile" className="form-control rounded-0" onChange={(e)=> SetMobile(e.target.value)}/>
    </div>

    <div className="mb-3">
    <label htmlFor="email">
    <strong>File</strong>
    </label>
    <input type="file" placeholder="Enter Mobile" className="form-control rounded-0" onChange={e =>setFile(e.target.files[0])}/>
    </div>
  
    <button type="submit" className="btn btn-success w-100 rounded-0">
    Submit
    </button>
    </form>
    
    </div>
    </div>
    )
}
export default CreateUser;