import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser(){

    const {id} = useParams()
    const [name,SetName] = useState()
    const [email,SetEmail] = useState()
    const [age,SetAge] = useState()
    const [mobile,SetMobile] = useState()
    const [image,SetFile] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result => {console.log(result)
            SetName(result.data.name)
            SetEmail(result.data.email)
            SetAge(result.data.age)
            SetMobile(result.data.mobile)
            SetFile(result.data.image)
        })
        .catch(err => console.log(err))
    },[])

    const Update = (e) =>{
        e.preventDefault();
        //console.log(image);
        //alert(image);
        
        axios.put('http://localhost:3001/updateUser/'+id,{name,email,age,mobile,image})
        .then(result => {console.log(result)
            navigate('/user')
            })

    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
    <div className="bg-white p-3 rounded w-25">
    <h2>Update User</h2>
    <form  onSubmit={Update}> 
    <div className="mb-2">
    <label htmlFor="email">
    <strong>Name</strong>
    </label>
    <input type="text" placeholder="Enter Name" autoComplete="off" name="email" className="form-control rounded-0" value={name} onChange={(e)=> SetName(e.target.value)}/>
    </div>
    <div className="mb-3">
    <label htmlFor="email">
    <strong>Email</strong>
    </label>
    <input type="email" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" value={email} onChange={(e)=> SetEmail(e.target.value)}/>
    </div>
    <div className="mb-3">
    <label htmlFor="email">
    <strong>Age</strong>
    </label>
    <input type="text" placeholder="Enter Age" name="age" className="form-control rounded-0" value={age} onChange={(e)=> SetAge(e.target.value)}/>
    </div>
    <div className="mb-3">
    <label htmlFor="email">
    <strong>Mobile</strong>
    </label>
    <input type="text" placeholder="Enter Mobile" name="mobile" className="form-control rounded-0" value={mobile} onChange={(e)=> SetMobile(e.target.value)}/>
    </div>
    <div className="mb-3">
    <label htmlFor="email">
    <strong>File</strong>
    </label>
    <input type="file"  className="form-control rounded-0"  onChange={e =>SetFile(e.target.files[0])}/>
    {<img src={`http://localhost:3001/img/${image}`} width={50} height={40} />}
    </div>

    <button type="submit" className="btn btn-success w-100 rounded-0" >
    Update
    </button>
    </form>
    
    </div>
    </div>
    )
}
export default UpdateUser;