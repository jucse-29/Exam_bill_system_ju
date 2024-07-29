import React, { useEffect, useState } from 'react';
import Teacher from './Teacher';

const Teachers = () => {
    const[faculty,setFaculty]=useState([]);

    useEffect(()=>{

        fetch('http://localhost:8000/day4app/api/faculty/')
        .then(res=>res.json())
        .then(data=>setFaculty(data))
    },[])
    return (
        <div>
           
             <h1 className="text-center mb-5">Faculty Members</h1>
                <div className="container">
                <div className="row ">
            {
                faculty.map(member=><Teacher member={member}></Teacher>)
            }
       </div>
       </div>
        </div>
    );
};

export default Teachers;