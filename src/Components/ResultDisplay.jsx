
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import './ResultDisplay.css';
import TitleContent from "./TitleContent";
import ResultFooter1 from "./ResultFooter1";
import ResultFooter2 from "./ResultFooter2";
function ResultDisplay() {
  const [courses, setCourses] = useState([]);
  const [rates, setRates] = useState([]);
  const [committees, setCommittees] = useState([]);
  const matchedCommitteeChief="";
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/day4app/api/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }

      axios.get('http://localhost:8000/day4app/api/rates/')
      .then(response => {
        // Set the fetched rates in state
        setRates(response.data);
      })
      .catch(error => {
        console.error('Error fetching rates:', error);
      });
      

      const committee_response=axios.get('http://localhost:8000/day4app/api/committees/')
      .then(committee_response => {
        // Set the fetched rates in state
        setCommittees(committee_response.data);
        console.log(committee_response.data);
        
      })
      .catch(error => {
        console.error('Error fetching committees:', error);
      });

      
      
    };

    fetchCourses();


    
  }, []);

 
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const department = searchParams.get("department");
  const semester = searchParams.get("semester");
  const name=searchParams.get("name");
  const bank_account_number=searchParams.get("bank_account_number");
  console.log("ACC NO",bank_account_number);
  const type=searchParams.get("type");
  const results = JSON.parse(searchParams.get("results"));
  console.log("Results:", results);
  const MakingQuestionPaper = results.filter(obj => obj.panelType && obj.panelType.includes("Making Question Paper"));
  // console.log("MakingQuestionPaper:", MakingQuestionPaper);
  const EvaluatingAnswerScripts = results.filter(obj => obj.panelType && obj.panelType.includes("Evaluating Answer Scripts"));
  const QuestionModeration = results.filter(obj => obj.panelType && obj.panelType.includes("Question Moderation"));
  const TransLation = results.filter(obj => obj.panelType && obj.panelType.includes("Translation"));
  const LabExam = results.filter(obj => obj.panelType && obj.panelType.includes("Lab Exam"));
  const VivaExam = results.filter(obj => obj.panelType && obj.panelType.includes("Viva Exam"));
  const Thesis_Project_ReportEvaluation = results.filter(obj => obj.panelType && obj.panelType.includes("Thesis/Project/Report Evaluation"));
  const practice = results.filter(obj => obj.panelType && obj.panelType.includes("Practice"));
  const tabulation = results.filter(obj => obj.panelType && obj.panelType.includes("Tabulation"));
  const stencil = results.filter(obj => obj.panelType && obj.panelType.includes("Stencil"));
  const ExamCommitteeChiefRemuneration = results.filter(obj => obj.panelType && obj.panelType.includes("Exam Committee Chiefs Remuneration"));
  const RemunerationofSupervisor_MPhil_PhD= results.filter(obj => obj.panelType && obj.panelType.includes("Remuneration of Supervisor(M.Phil/PhD)"));
  
  var totalResult = 0;
  const numberToWords = require('number-to-words');
  const options = { locale: 'bn-IN' };
  



  const panelTypesForRow = ["Making Question Paper","Translation", "Evaluating Answer Scripts","Question Moderation", "Lab Exam", "Viva Exam", "Thesis/Project/Report Evaluation","Practice","Tabulation","Exam Committee Chief's Remuneration","Remuneration of Supervisor(M.Phil/PhD)","Stencil"];
  
  const panelNames = {
    "Making Question Paper": "প্রশ্নপত্র প্রণয়ন",
    "Evaluating Answer Scripts": "উত্তরপত্র মূল্যায়ন",
    "Lab Exam": "ব্যবহারিক পরীক্ষা",
    "Viva Exam": "মৌখিক পরীক্ষা",
    "Question Moderation": "প্রশ্নপত্র মডারেশন",
    "Stencil": "স্টেনসিল কাটা",
    "Translation":"অনুবাদ",
    "Thesis/Project/Report Evaluation":"থিসিস/প্রজেক্ট/রিপোর্ট মূল্যায়ন",
    "Exersice":"অনুশীলনী",
    "Tabulation":"টেবুলেশন",
    "Exam Committee Chief's Remuneration":"কমিটির সভাপতির পারিতোষিক",
    "Remuneration of Supervisor(M.Phil/PhD)":"তত্ত্বাবধায়ক সম্মানী(এম. ফিল/ পিএইচ.ডি"
  };
  const formatType = {
    "Hons" : "স্নাতক সম্মান",
    "Masters" :"স্নাতকোত্তর",
    "MPhil" :"এম.ফিল",
    "PhD" : "পি এইচ.ডি",
  };
  const dept ={
    "Computer Science and Engineering" : "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং",
    
  }

  const sem = {
    "1st Year 1st Semester": "১ম পর্ব ১ম সেমিস্টার",
    "1st Year 2nd Semester": "১ম পর্ব ২য় সেমিস্টার",
    "2nd Year 1st Semester": "২য় পর্ব ১ম সেমিস্টার",
    "2nd Year 2nd Semester": "২য় পর্ব ২য় সেমিস্টার",
    "3rd Year 1st Semester": "৩য় পর্ব ১ম সেমিস্টার",
    "3rd Year 2nd Semester": "৩য় পর্ব ২য় সেমিস্টার",
    "4th Year 1st Semester": "৪র্থ  পর্ব ১ম সেমিস্টার",
    "4th Year 2nd Semester": "৪র্থ  পর্ব ২য় সেমিস্টার",
    
  };
 
    const defaultPanelNames = [
    "Making Question Paper",
    "Evaluating Answer Scripts",
    "Question Moderation",
    "Lab Exam",
    "Viva Exam",
    "Stencil",
  ];
  
  
  function findCommitteeChief(committees, semester) {
    // Extract the first three characters of the semester
    const semesterPrefix = semester.substring(0, 3);
    
    // Iterate through the committees
    for (const committee of committees) {
      // Extract the first three characters of the committee's year
      const committeeYearPrefix = committee.year.substring(0, 3);
      
      // Check if the prefixes match
      if (semesterPrefix === committeeYearPrefix) {
        // If match found, return the committee chief
        return committee.committee_chief;
      }
    }

    
    
    // Return a default value if no match is found
    return "";
  }

  function findCommitteeSession(committees, semester) {
    // Extract the first three characters of the semester
    const semesterPrefix = semester.substring(0, 3);
    
    // Iterate through the committees
    for (const committee of committees) {
      // Extract the first three characters of the committee's year
      const committeeYearPrefix = committee.year.substring(0, 3);
      
      // Check if the prefixes match
      if (semesterPrefix === committeeYearPrefix) {
        // If match found, return the committee chief
        return committee.session;
      }
    }

    
    
    // Return a default value if no match is found
    return "";
  }
 
  const findCommitteeAmount = () => {
   
    const semesterPrefix = semester.substring(0, 3);
    
    
    for (const committee of committees) {
      
      const committeeYearPrefix = committee.year.substring(0, 3);
      if (semesterPrefix === committeeYearPrefix ) {
      const committee_chief_name=findCommitteeChief(committees, semester);
      if (name === committee_chief_name ) {
        // Return the corresponding amount
        // totalResult+=2700;
        // return `Tk ${(2700).toLocaleString()}`;
        const matchingRate = rates.find(rate => (rate.name === "Exam Committee Chief_s Remuneration" && rate.category==="Hons"));
        if (matchingRate) {
        totalResult += parseFloat(matchingRate.value);
        console.log("Calculated values:", totalResult);
        return `Tk ${(matchingRate.value).toLocaleString()}`;
      }
      }
    }
    }
    
    // If no match is found, return null or any default value as per your requirement
    return null;
  };
  
  function calculateValue(panelType,results) {
                if(panelType==="Making Question Paper" || panelType==="Question Moderation"){
                if (results.numHours === 4) {
                  totalResult += 2150;
                  return `Tk ${(2150).toLocaleString()}`;
                } else if (results.numHours === 3) {
                  totalResult += 2000;
                  return `Tk ${(2000).toLocaleString()}`;
                } else if (results.numHours === 2) {
                  totalResult += 1500;
                  return "Tk 1,500";
                } else {
                  totalResult += 1500;
                  return "Tk 1,500";
                } 
              }

  else if(panelType==="Evaluating Answer Scripts"){
    if (results.numHours === 4) {
   totalResult += results.numStudents * 140;
   return `Tk ${(results.numStudents * 140).toLocaleString()}`;
   } else if (results.numHours === 3) {
     totalResult += results.numStudents * 115;
    return `Tk ${(results.numStudents * 115).toLocaleString()}`;
   } else if (results.numHours === 2) {
      totalResult += results.numStudents * 95;
    return `Tk ${(results.numStudents * 95).toLocaleString()}`;
    }else if (results.numHours === 2.5) {
    totalResult += results.numStudents * 85;
    return `Tk ${(results.numStudents * 85).toLocaleString()}`;
   } 
 else if (results.numHours === 1) {
   totalResult += results.numStudents * 85;
   return `Tk ${(results.numStudents * 85).toLocaleString()}`;
  } else {
  return "Tk0"; 
 }
  }
  else if(panelType==="Lab Exam"){
  if (results.numHours>=1 && results.numHours<=4) {
    totalResult +=  results.daysOfExam * 2000 ;
    return `Tk ${(results.daysOfExam * 2000).toLocaleString()}`;
  } else if (results.numHours>=6) {
    totalResult += results.daysOfExam * 2750;
    return `Tk ${(results.daysOfExam * 2750).toLocaleString()}`;
  }
}
else if(panelType==="Viva Exam"){
if (results.type === "Hons" || results.type === "Masters") {
  totalResult += results.numStudents * 100;
  return `Tk ${(results.numStudents * 100).toLocaleString()}`;
} else if (results.type === "MPhil") {
  totalResult += results.numStudents * 1125;
  return `Tk ${(results.numStudents * 1125).toLocaleString()}`;
} else {
  totalResult += results.numStudents * 1875;
  return `Tk ${(results.numStudents * 1875).toLocaleString()}`;
}
}
else if(panelType==="Stencil"){
totalResult += (results.stencilPages *125);
return `Tk ${(results.stencilPages *125).toLocaleString()}`;
}

else if(panelType==="Tabulation"){
  if ((results.type === "Masters" && semester === "1st Year 2nd Semester") ||(results.type === "Hons" && semester === "4th Year 2nd Semester") ) {
    totalResult += 1875;
    return "Tk 1,875";
  }
  else if ((results.type === "Masters" ||results.type === "Hons") ) {
    totalResult += 1500;
    return "Tk 1,500";
  }
  else if ((results.type === "MPhil" ||results.type === "PhD") ) {
    totalResult += 18750;
    return "Tk 1,875";
  }
  }
 }

 function calculateValue2(panelType,results) {
  if(panelType==="Making Question Paper" || panelType==="Question Moderation"){
  if (results.numHours === 4) {
    // totalResult += 2150;
    
    const matchingRate = rates.find(rate => (rate.name === "Making Question Paper" || rate.name === "Question Moderation") && rate.category === "4");
    if (matchingRate) {
      totalResult += parseFloat(matchingRate.value);
      console.log("Calculated values:", totalResult);
      return `Tk ${matchingRate.value.toLocaleString()}`;
    }
    // return "Tk 2,150";
  } else if (results.numHours === 3) {
    const matchingRate = rates.find(rate => (rate.name === "Making Question Paper" || rate.name === "Question Moderation") && rate.category === "3");
    if (matchingRate) {
      totalResult += parseFloat(matchingRate.value);
      console.log("Calculated values:", totalResult);
      return `Tk ${matchingRate.value.toLocaleString()}`;
    }
    // totalResult += 2000;
    // return `Tk ${(2000).toLocaleString()}`;
  } else if (results.numHours === 2) {
    const matchingRate = rates.find(rate => (rate.name === "Making Question Paper" || rate.name === "Question Moderation") && rate.category === "2");
    if (matchingRate) {
      totalResult += parseFloat(matchingRate.value);
      console.log("Calculated values:", totalResult);
      return `Tk ${matchingRate.value.toLocaleString()}`;
    }
    // totalResult += 1500;
    // return "Tk 1,500";
  } else {
    const matchingRate = rates.find(rate => (rate.name === "Making Question Paper" || rate.name === "Question Moderation") && rate.category === "< 2");
    if (matchingRate) {
      totalResult += parseFloat(matchingRate.value);
      console.log("Calculated values:", totalResult);
      return `Tk ${matchingRate.value.toLocaleString()}`;
    }
  } 
}

else if(panelType==="Evaluating Answer Scripts"){
if (results.numHours === 4) {
  const matchingRate = rates.find(rate => rate.name === "Evaluating Answer Scripts" && rate.category === "4");
  if (matchingRate) {
    totalResult += parseFloat(matchingRate.value*results.numStudents);
    console.log("Calculated values:", totalResult);
    return `Tk ${(matchingRate.value*results.numStudents).toLocaleString()}`;
  }
} else if (results.numHours === 3) {
  const matchingRate = rates.find(rate => rate.name === "Evaluating Answer Scripts" && rate.category === "3");
  if (matchingRate) {
    totalResult += parseFloat(matchingRate.value*results.numStudents);
    console.log("Calculated values:", totalResult);
    return `Tk ${(matchingRate.value*results.numStudents).toLocaleString()}`;
  }
} else if (results.numHours === 2) {
  const matchingRate = rates.find(rate => rate.name === "Evaluating Answer Scripts" && rate.category === "2");
  if (matchingRate) {
    totalResult += parseFloat(matchingRate.value*results.numStudents);
    console.log("Calculated values:", totalResult);
    return `Tk ${(matchingRate.value*results.numStudents).toLocaleString()}`;
  }
}else if (results.numHours === 2.5) {
  const matchingRate = rates.find(rate => rate.name === "Evaluating Answer Scripts" && rate.category === "2.50");
  if (matchingRate) {
    totalResult += parseFloat(matchingRate.value*results.numStudents);
    console.log("Calculated values:", totalResult);
    return `Tk ${(matchingRate.value*results.numStudents).toLocaleString()}`;
  }
} 
else if (results.numHours === 1) {
  const matchingRate = rates.find(rate => rate.name === "Evaluating Answer Scripts" && rate.category === "<=1");
  if (matchingRate) {
    totalResult += parseFloat(matchingRate.value*results.numStudents);
    console.log("Calculated values:", totalResult);
    return `Tk ${(matchingRate.value*results.numStudents).toLocaleString()}`;
  }
} else {
  const matchingRate = rates.find(rate => rate.name === "Evaluating Answer Scripts" && rate.category === "<=1");
  if (matchingRate) {
    totalResult += parseFloat(matchingRate.value*results.numStudents);
    console.log("Calculated values:", totalResult);
    return `Tk ${(matchingRate.value*results.numStudents).toLocaleString()}`;
  }
}
}
else if(panelType==="Lab Exam"){
if (results.numHours>=1 && results.numHours<=4) {
  const matchingRate = rates.find(rate => rate.name === "Lab Exam" && rate.category === "<=4");
  if (matchingRate) {
    totalResult += parseFloat(matchingRate.value*results.daysOfExam);
    console.log("Calculated values:", totalResult);
    return `Tk ${(matchingRate.value*results.daysOfExam).toLocaleString()}`;
  }
// totalResult +=  results.daysOfExam * 2000 ;
// return `Tk ${(results.daysOfExam * 2000).toLocaleString()}`;
} else if (results.numHours>=6) {
  const matchingRate = rates.find(rate => rate.name === "Lab Exam" && rate.category === ">4");
  if (matchingRate) {
    totalResult += parseFloat(matchingRate.value*results.daysOfExam);
    console.log("Calculated values:", totalResult);
    return `Tk ${(matchingRate.value*results.daysOfExam).toLocaleString()}`;
  }
}
}
else if(panelType==="Viva Exam"){
  
if (results.type === "Hons" || results.type === "Masters") {
  const matchingRate = rates.find(rate => (rate.name === "Viva Exam") && (rate.category=== "B.Sc/MSc"));
    if (matchingRate) {
      totalResult += parseFloat(results.numStudents*matchingRate.value);
      console.log("Calculated values:", totalResult);
      return `Tk ${(results.numStudents * matchingRate.value).toLocaleString()}`;
    }

} else if (results.type === "MPhil") {
  const matchingRate = rates.find(rate => (rate.name === "Viva Exam") && (rate.category=== "MPhil"));
  if (matchingRate) {
    totalResult += parseFloat(results.numStudents*matchingRate.value);
    console.log("Calculated values:", totalResult);
    return `Tk ${(results.numStudents * matchingRate.value).toLocaleString()}`;
  }
} else {
  const matchingRate = rates.find(rate => (rate.name === "Viva Exam") && (rate.category=== "PhD"));
  if (matchingRate) {
    totalResult += parseFloat(results.numStudents*matchingRate.value);
    console.log("Calculated values:", totalResult);
    return `Tk ${(results.numStudents * matchingRate.value).toLocaleString()}`;
  }

}
}
else if(panelType==="Stencil"){
  const matchingRate = rates.find(rate => (rate.name === "Stencil"));
  if (matchingRate) {
    totalResult += parseFloat(results.stencilPages*matchingRate.value);
    console.log("Calculated values:", totalResult);
    return `Tk ${(results.stencilPages  * matchingRate.value).toLocaleString()}`;
  
  }
}

else if(panelType==="Tabulation"){
  if ((results.type === "Masters" && semester === "1st Year 2nd Semester") ||(results.type === "Hons" && semester === "4th Year 2nd Semester") ){
    const matchingRate = rates.find(rate => (rate.name === "Tabulation" && rate.category==="Final Semester"));
    if (matchingRate) {
    totalResult += parseFloat(matchingRate.value);
    console.log("Calculated values:", totalResult);
    return `Tk ${matchingRate.value.toLocaleString()}`;
  }
}

  else if ((results.type === "Masters" || results.type === "Hons")  ){
    const matchingRate = rates.find(rate => (rate.name === "Tabulation" && rate.category==="Semester Wise"));
    if (matchingRate) {
    totalResult += parseFloat(matchingRate.value);
    console.log("Calculated values:", totalResult);
    return `Tk ${matchingRate.value.toLocaleString()}`;
  }}
  else if ((results.type === "MPhil" ||results.type === "PhD") ) {
    const matchingRate = rates.find(rate => (rate.name === "Tabulation" && rate.category==="MPhil/PhD"));
    if (matchingRate) {
    totalResult += parseFloat(matchingRate.value);
    console.log("Calculated values:", totalResult);
    return `Tk ${(matchingRate.value).toLocaleString()}`;
  }
}
  
}

else if(panelType==="Thesis/Project/Report Evaluation"){
  if ((results.type === "Hons")){
    const matchingRate = rates.find(rate => (rate.name === "Thesis/Project/Report Evaluation"  && rate.category==="Hons"));
    if (matchingRate) {
    totalResult += parseFloat(results.numStudents*matchingRate.value);
    console.log("Calculated values:", totalResult);
    return `Tk ${(results.numStudents * matchingRate.value).toLocaleString()}`;
  }
}
  
}





}
 
 

  return (
    <div className="container mt-4 light">
      <TitleContent bank_account_number={bank_account_number} />
      <div className="result-display text-center" >
      {/* <br/> ACC NO{bank_account_number} */}
          <p  style={{ fontSize: '25px', textAlign: 'left' }}>পরীক্ষকের নাম :  <strong style={{ textTransform: 'uppercase' }}>{name}</strong></p>  
          <p style={{ fontSize: '25px', textAlign: 'left', }}> <strong>{findCommitteeSession(committees, semester)} </strong> সনের  <strong >{ sem[semester]}</strong> {formatType[type]}  পরীক্ষা সংক্রান্ত কাজের বিস্তারিত বিবরণ</p>
        
          <div className="result-table">
          <table className="table table-bordered table-hover text-black">
            <thead>
              <tr className="custom-header">
              
              <th>কাজের ধরণ</th>
              <th>বিভাগ</th>
              <th>কোর্সের নাম</th>
              <th>কোর্স নং</th>
              <th>উত্তরপত্র/থিসিস/প্রজেক্ট/স্টেনসিল সংখ্যা</th>
              <th>পরীক্ষার্থী সংখ্যা</th>
              <th>মোট দিন</th>
              <th>কত ঘণ্টার পরীক্ষা</th>
              <th>টাকার পরিমাণ</th>
              </tr>
            </thead>
            
            <tbody>
            {/* {results.map((result, index) => (result.panelType.map((panelType, panelIndex) => 
            (<tr key={`${index}_${panelIndex}`}>
              <td>{panelNames[panelType]}</td>
              <td>{dept[department]}</td>
              <td>{result.courseName}</td>
              <td>{result.courseCode}</td>
              <td>{result.stencilPages === null || result.stencilPages === 0 ? '--' : result.stencilPages}</td>
              <td>{result.numStudents === null || result.numStudents === 0 ? '--' : result.numStudents}</td>
              <td>{result.daysOfExam === null || result.daysOfExam === 0 ? '--' : result.daysOfExam}</td>
              <td>{result.numHours === null || result.numHours === 0 ? '--' : result.numHours}</td>
              <td>{calculateValue(panelType, result)}</td>
          </tr>
        ))
        
    ))}  */}
  
               <tr></tr>

               

               

<tr>
  <td>প্রশ্নপত্র প্রণয়ন</td>
  
  {MakingQuestionPaper.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{MakingQuestionPaper.map(obj => obj.courseName).join(', ')}</td>
      <td>{MakingQuestionPaper.map(obj => obj.courseCode).join(', ')}</td>
      <td>{MakingQuestionPaper.map(obj => obj.stencilPages !== 0 ?'' : '--')}</td>
      <td>{MakingQuestionPaper.map(obj => obj.numStudents !== 0 ? '' : '--').join(', ')}</td>
      <td>{MakingQuestionPaper.map(obj => obj.daysOfExam !== 0 ? '' : '--')}</td>
      <td>{MakingQuestionPaper.map(obj => obj.numHours !== 0 ? obj.numHours : '--').join(', ')}</td>
      <td>{MakingQuestionPaper.map(obj => calculateValue2('Making Question Paper', obj)).join(', ')}</td>
    </>
  ) : (
    <>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      
    </>
  )}
</tr>

<tr>
  <td>অনুবাদ</td>
  {TransLation.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{TransLation.map(obj => obj.courseName).join(', ')}</td>
      <td>{TransLation.map(obj => obj.courseCode).join(', ')}</td>
      <td>{TransLation.map(obj => obj.stencilPages !== 0 ? '' : '--').join(', ')}</td>
      <td>{TransLation.map(obj => obj.numStudents !== 0 ? obj.numStudents : '--').join(', ')}</td>
      <td>{TransLation.map(obj => obj.daysOfExam !== 0 ? '' : '--').join(', ')}</td>
      <td>{TransLation.map(obj => obj.numHours !== 0 ? '': '--').join(', ')}</td>
      <td>{TransLation.map(obj => calculateValue('Translation', obj)).join(', ')}</td>
    </>
  ) : (
    <>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      
    </>
  )}
</tr>

<tr>
  <td>প্রশ্নপত্র মডারেশন</td>
  {QuestionModeration.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{QuestionModeration.map(obj => obj.courseName).join(', ')}</td>
      <td>{QuestionModeration.map(obj => obj.courseCode).join(', ')}</td>
      <td>{QuestionModeration.map(obj => obj.stencilPages !== 0 ? '' : '--')}</td>
      <td>{QuestionModeration.map(obj => obj.numStudents !== 0 ? '' : '--').join(', ')}</td>
      <td>{QuestionModeration.map(obj => obj.daysOfExam !== 0 ? '' : '--')}</td>
      <td>{QuestionModeration.map(obj => obj.numHours !== 0 ? obj.numHours : '--').join(', ')}</td>
      <td>{QuestionModeration.map(obj => calculateValue2('Question Moderation', obj)).join(', ')}</td>
    </>
  ) : (
    <>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      
    </>
  )}
</tr>
                 

<tr>
  <td>উত্তরপত্র মূল্যায়ন</td>
  {EvaluatingAnswerScripts.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{EvaluatingAnswerScripts.map(obj => obj.courseName).join(', ')}</td>
      <td>{EvaluatingAnswerScripts.map(obj => obj.courseCode).join(', ')}</td>
      <td>{EvaluatingAnswerScripts.map(obj => obj.stencilPages !== 0 ? '' : '--')}</td>
      <td>{EvaluatingAnswerScripts.map(obj => obj.numStudents !== 0 ? obj.numStudents : '--').join(', ')}</td>
      <td>{EvaluatingAnswerScripts.map(obj => obj.daysOfExam !== 0 ? '' : '--')}</td>
      <td>{EvaluatingAnswerScripts.map(obj => obj.numHours !== 0 ? obj.numHours : '--').join(', ')}</td>
      <td>{EvaluatingAnswerScripts.map(obj => calculateValue2('Evaluating Answer Scripts', obj)).join(', ')}</td>
    </>
  ) : (
    <>
     
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </>
  )}
</tr>

<tr>
  <td>ব্যবহারিক পরীক্ষা</td>
  {LabExam.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{LabExam.map(obj => obj.courseName).join(', ')}</td>
      <td>{LabExam.map(obj => obj.courseCode).join(', ')}</td>
      <td>{LabExam.map(obj => obj.stencilPages !== 0 ? '' : '--')}</td>
      <td>{LabExam.map(obj => obj.numStudents !== 0 ? obj.numStudents : '--').join(', ')}</td>
      <td>{LabExam.map(obj => obj.daysOfExam !== 0 ? obj.daysOfExam : '--').join(', ')}</td>
      <td>{LabExam.map(obj => obj.numHours !== 0 ? obj.numHours : '--').join(', ')}</td>
      <td>{LabExam.map(obj => calculateValue2('Lab Exam', obj)).join(', ')}</td>
    </>
  ) : (
    <>
     
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </>
  )}
</tr>

<tr>
  <td>মৌখিক পরীক্ষা</td>
  {VivaExam.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{VivaExam.map(obj => obj.courseName).join(', ')}</td>
      <td>{VivaExam.map(obj => obj.courseCode).join(', ')}</td>
      <td>{VivaExam.map(obj => obj.stencilPages !== 0 ? '' : '--')}</td>
      <td>{VivaExam.map(obj => obj.numStudents !== 0 ? obj.numStudents : '--').join(', ')}</td>
      <td>{VivaExam.map(obj => obj.daysOfExam !== 0 ? '' : '--')}</td>
      <td>{VivaExam.map(obj => obj.numHours !== 0 ? '' : '--')}</td>
      <td>{VivaExam.map(obj => calculateValue2('Viva Exam', obj)).join(', ')}</td>
    </>
  ) : (
    <>
     
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </>
  )}
</tr>
  
<tr>
  <td>থিসিস/প্রজেক্ট/রিপোর্ট মূল্যায়ন</td>
  {Thesis_Project_ReportEvaluation.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{Thesis_Project_ReportEvaluation.map(obj => obj.courseName).join(', ')}</td>
      <td>{Thesis_Project_ReportEvaluation.map(obj => obj.courseCode).join(', ')}</td>
      <td>{Thesis_Project_ReportEvaluation.map(obj => obj.stencilPages !== 0 ? '' : '--')}</td>
      <td>{Thesis_Project_ReportEvaluation.map(obj => obj.numStudents !== 0 ? obj.numStudents : '--').join(', ')}</td>
      <td>{Thesis_Project_ReportEvaluation.map(obj => obj.daysOfExam !== 0 ? '' : '--')}</td>
      <td>{Thesis_Project_ReportEvaluation.map(obj => obj.numHours !== 0 ? '' : '--')}</td>
      <td>{Thesis_Project_ReportEvaluation.map(obj => calculateValue2('Thesis/Project/Report Evaluation', obj)).join(', ')}</td>
    </>
  ) : (
    <>
     
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </>
  )}
</tr>   

<tr>
  <td>অনুশীলনী</td>
  {practice.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{practice.map(obj => obj.courseName).join(', ')}</td>
      <td>{practice.map(obj => obj.courseCode).join(', ')}</td>
      <td>{practice.map(obj => obj.stencilPages !== 0 ? '' : '--')}</td>
      <td>{practice.map(obj => obj.numStudents !== 0 ? obj.numStudents : '--').join(', ')}</td>
      <td>{practice.map(obj => obj.daysOfExam !== 0 ? '' : '--')}</td>
      <td>{practice.map(obj => obj.numHours !== 0 ? '' : '--')}</td>
      <td>{practice.map(obj => calculateValue('Practice', obj)).join(', ')}</td>
    </>
  ) : (
    <>
     
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </>
  )}
</tr> 
  <tr>
  <td>টেবুলেশন</td>
  {tabulation.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{tabulation.map(obj => obj.courseName).join(', ')}</td>
      <td>{tabulation.map(obj => obj.courseCode).join(', ')}</td>
      <td>{tabulation.map(obj => obj.stencilPages !== 0 ? '' : '--')}</td>
      <td>{tabulation.map(obj => obj.numStudents !== 0 ? '--': '--').join(', ')}</td>
      <td>{tabulation.map(obj => obj.daysOfExam !== 0 ? '' : '--')}</td>
      <td>{tabulation.map(obj => obj.numHours !== 0 ? '' : '--').join(', ')}</td>
      <td>{tabulation.map(obj => calculateValue2('Tabulation', obj)).join('\n ')}</td>
    </>
  ) : (
    <>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      
    </>
  )}
</tr>

<tr>
  <td>স্টেনসিল কাটা</td>
  {stencil.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{stencil.map(obj => obj.courseName).join(', ')}</td>
      <td>{stencil.map(obj => obj.courseCode).join(', ')}</td>
      <td>{stencil.map(obj => obj.stencilPages !== 0 ? obj.stencilPages : '--')}</td>
      <td>{stencil.map(obj => obj.numStudents !== 0 ? '--': '--').join(', ')}</td>
      <td>{stencil.map(obj => obj.daysOfExam !== 0 ? '' : '--')}</td>
      <td>{stencil.map(obj => obj.numHours !== 0 ? '' : '--')}</td>
      <td>{stencil.map(obj => calculateValue2('Stencil', obj)).join(', ')}</td>
    </>
  ) : (
    <>
     
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </>
  )}
</tr>   

<tr>
  <td>কমিটির সভাপতির পারিতোষিক</td>
  {ExamCommitteeChiefRemuneration.length > 0 ? (
    <>
      <td></td>
      <td>{ExamCommitteeChiefRemuneration.map(obj => obj.courseName).join(', ')}</td>
      <td>{ExamCommitteeChiefRemuneration.map(obj => obj.courseCode).join(', ')}</td>
      <td>{ExamCommitteeChiefRemuneration.map(obj => obj.stencilPages !== 0 ? '' : '--')}</td>
      <td>{ExamCommitteeChiefRemuneration.map(obj => obj.numStudents !== 0 ? obj.numStudents : '--').join(', ')}</td>
      <td>{ExamCommitteeChiefRemuneration.map(obj => obj.daysOfExam !== 0 ? '' : '--')}</td>
      <td>{ExamCommitteeChiefRemuneration.map(obj => obj.numHours !== 0 ? '' : '--')}</td>
      <td>{findCommitteeAmount()}</td>
    </>
  ) : (
    <>
     
     <td>{findCommitteeAmount() !== null ?dept[department]: null}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{findCommitteeAmount()}</td>
    </>
  )}
</tr>  
<tr>
  <td>তত্ত্বাবধায়ক সম্মানী(এম. ফিল/ পিএইচ.ডি)</td>
  {RemunerationofSupervisor_MPhil_PhD.length > 0 ? (
    <>
      <td>{dept[department]}</td>
      <td>{RemunerationofSupervisor_MPhil_PhD.map(obj => obj.courseName).join(', ')}</td>
      <td>{RemunerationofSupervisor_MPhil_PhD.map(obj => obj.courseCode).join(', ')}</td>
      <td>{RemunerationofSupervisor_MPhil_PhD.map(obj => obj.stencilPages !== 0 ? '' : '--')}</td>
      <td>{RemunerationofSupervisor_MPhil_PhD.map(obj => obj.numStudents !== 0 ? obj.numStudents : '--').join(', ')}</td>
      <td>{RemunerationofSupervisor_MPhil_PhD.map(obj => obj.daysOfExam !== 0 ? '' : '--')}</td>
      <td>{RemunerationofSupervisor_MPhil_PhD.map(obj => obj.numHours !== 0 ? '' : '--')}</td>
      <td>{RemunerationofSupervisor_MPhil_PhD.map(obj => calculateValue('Remuneration of Supervisor(M.Phil/PhD)', obj)).join(', ')}</td>
    </>
  ) : (
    <>
     
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </>
  )}
</tr>   
 
               <tr > 
               <td rowSpan="2" >আনুসঙ্গিক খরচ</td>
               <td className="left-aligned"colSpan="7">রশিদ নং</td>
               <td rowSpan="2"></td>
               </tr>

               <tr > 
               <td className="left-aligned" colSpan="7">খরচের রশিদ সংযুক্ত করতে হবে</td>
               </tr>
              
                <tr >
                <td className="right-aligned" colSpan="8" ><strong>মোট টাকা</strong></td>
                <td className="text-center">Tk {totalResult.toLocaleString()}

                </td>
                </tr>
                </tbody>
                </table>
                 </div>
 
 
  
        <p className="text-right" >টাকার পরিমাণ: <strong>  {totalResult.toLocaleString('bn-BD')} </strong>টাকা মাত্র</p>   
        <hr className="section-divider"/>
        <ResultFooter1/>
        <p className="declaration">প্রফেসর/ড./জনাব  <strong> {findCommitteeChief(committees, semester)} ,সভাপতি </strong>, পরীক্ষা কমিটি ,<strong>{ sem[semester]} </strong>, বিভাগ <strong>{dept[department]}</strong> ,জাবি।</p>   
        </div>
      
        <hr className="section-divider" style={{width:'1500px', marginLeft:'-200px',}}/>
        <p className="declaration-two" style={{ marginLeft:'-150px' }}>প্রফেসর/ড./জনাব    <strong style={{ textTransform: 'uppercase' }}>{name}</strong>   কে <strong>  {totalResult.toLocaleString('bn-BD')} </strong> টাকা মাত্র প্রদান করা যেতে পারে।<br/>সমুদয় টাকা বুঝে পেলাম।</p> 
        <ResultFooter2/>
        {/* <div>
      <h1>Course Data</h1>
      <ul>
        {courses.map(course => (
          <li key={course.course_id}>{course.course_name}: {course.credit}</li>
        ))}
      </ul>
       
      <ul>
        {committees.map((committee, index) => (
          <li key={`${committee.year}-${committee.committee_chief}-${index}`}>{committee.year}: {committee.committee_chief}</li>
        ))}
      </ul>

      <ul>
        {rates.map((rate, index) => (
          <li key={`${rate.name}-${rate.category}-${index}`}>{rate.name}: {rate.category}: {rate.value}</li>
        ))}
      </ul>
      
    </div> */}
        </div>
  );
}

export default ResultDisplay;
