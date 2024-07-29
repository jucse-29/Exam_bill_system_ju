import React from 'react';
import { Link } from 'react-router-dom';
const Teacher = ({member}) => {
    const{id,name,image,rank}=member;
    return (
       
             <div className="col-lg-3 col-md-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img src={image} alt="avatar"
                      className="rounded-circle img-fluid"width={150}/>
                    <h5 className="my-3"> {name}</h5>
                    <p className="text-muted mb-1">{rank}</p><br/>
                    <div className="d-flex justify-content-center mb-2">
                     <Link to={`/teachers/${id}`}><button type="button" class="btn btn-outline-primary ms-1 m-auto" >Make Bill</button></Link> 
                    </div>
                  </div>
            </div>
      </div>
      
    );
};

export default Teacher;