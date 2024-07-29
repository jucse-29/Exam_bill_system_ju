import React from "react";
import myImage from "./Bill.jpg";

function Seal() {
    const imageStyles = {
      maxWidth: "150%",   
      height: "70%",       
      marginTop:"10px",
    };
  
    return (
      
        <img src={myImage} alt="Bill" style={imageStyles} />
       
      
    );
  }
  
  export default Seal;