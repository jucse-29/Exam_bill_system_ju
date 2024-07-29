import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header2 from './Header2';
import Footer from './Footer';
import '../CSS/profile.css'
import InputForm from './InputForm';

const Profile = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:8000/day4app/api/faculty/')
        .then((res) => res.json())
        .then((data) => {
          
          const matchingTeacher = data.find((teacher) => teacher.id === parseInt(id, 10));
          setTeacher(matchingTeacher);
          
        });
    }, [id]);
    return (
        <div>
            <Header2></Header2>
      {teacher && (
        <div className="container mt-5 d-flex justify-content-center  bg-info-subtle">
       
            <div className="d-flex align-items-center border border-3 p-3 m-3 gap-5">
                <div className="image">
            <img src={teacher.image} className='rounded' width={180} alt=''/>
            </div>
            <div className="">               
               <h4 className="fw-bold">{teacher.name}</h4>
               <span className='fst-italic'>{teacher.rank}</span>
            </div>
            </div>        
        </div>      
    
      )}
     
     {teacher !== null && <InputForm name={teacher.name} bankAccountNumber={teacher.bank_account_number}></InputForm>}
      <Footer></Footer>
        </div>
    );
};

export default Profile;