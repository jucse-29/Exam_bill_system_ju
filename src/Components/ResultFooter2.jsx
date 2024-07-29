import React from "react";
import TaxTicket from "./TaxTicket";
function ResultFooter2() {
   
 

    return (
          <div>
          <div className="signatures">
          <div className="signature" style={{marginLeft:'-200px'}}>
          <hr className="signature-line"/> 
          পরীক্ষকের স্বাক্ষর
          </div>
          <div className="result-display" style={{ marginLeft:'0px' }} >  
           <TaxTicket />
           </div>
           <div>
           <hr className="signature-line"/>
            উপ-পরীক্ষা নিয়ন্ত্রক
           </div>
           </div>
           </div>
      
    );
  }
  
  export default ResultFooter2;