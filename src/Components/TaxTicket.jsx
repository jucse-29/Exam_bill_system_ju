import React from "react";
import myImage from "./ticket.jpg";

function TaxTicket() {
    const imageStyles = {
      maxWidth: "100%",   
      height: "100%",       
    
    };
  
    return (
      
        <img src={myImage} alt="TT" style={imageStyles} />
       
      
    );
  }
  
  export default TaxTicket;