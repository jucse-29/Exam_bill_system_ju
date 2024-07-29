import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './input.css';
import CourseFetcher from './CourseFetcher';
function InputForm(props) {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState("1st Year 1st Semester");
  const [currentSemester, setCurrentSemester] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
  const [selectedType, setSelectedType] = useState("Hons");
  const [selectName,setSelectedName]=useState(props.name);
  const [selectBankAccNo,setSelectedBankAccNo]=useState(props.bankAccountNumber);
  const [inputData, setInputData] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]); 
  const [selectedCoursesBySemester, setSelectedCoursesBySemester] = useState({});
  const [selectedPanelTypes, setSelectedPanelTypes] = useState([]);
  const [selectedCoursesByBackend, setSelectedCoursesByBackend] = useState([]);
  const [fetchedCourses, setFetchedCourses] = useState([]);

  
  
  const addCoursePanel = (courseName) => {
    const courseCode = courseToCodeMapping[courseName];
    const newPanel = {
      panelType:"",
      type: "Hons",
      courseName,
      courseCode,
      numStudents: 0,
      numHours: 0,
      tabulationType: "Yearly",
      tabulationSemester: "Final Year",
      daysOfExam: "",
    };
    setInputData((prevData) => [...prevData, newPanel]);
  };

  const removeCoursePanel = (courseName) => {
    setInputData((prevData) => prevData.filter((panel) => panel.courseName !== courseName));
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCoursesBySemester((prevSelectedCourses) => ({
      ...prevSelectedCourses,
      [currentSemester]: isChecked
        ? [...(prevSelectedCourses[currentSemester] || []), selectedCourse]
        : (prevSelectedCourses[currentSemester] || []).filter((course) => course !== selectedCourse),
    }));

    if (isChecked) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
      addCoursePanel(selectedCourse);
    } else {
      setSelectedCourses(selectedCourses.filter((course) => course !== selectedCourse));
      removeCoursePanel(selectedCourse);
    }
  };

 
  

  const handleSemesterChange = (newSemester) => {
    setSelectedSemester(newSemester);
    setCurrentSemester(newSemester);
    setInputData([]);
    setSelectedCourses([]); // Clear the selected courses when the semester changes
  }; 
  
  const handlePanelTypeChange = (e, panelType,index) => {
    const { checked } = e.target;
    const newInputData = [...inputData];
  
    // If the checkbox is checked, add the panelType to the array
    if (checked) {
      
      newInputData[index] = {
        ...newInputData[index],
        panelType: [...newInputData[index].panelType, panelType],
      };
    } else {
      // If the checkbox is unchecked, remove the panelType from the array
      newInputData[index] = {
        ...newInputData[index],
        panelType: newInputData[index].panelType.filter((type) => type !== panelType),
      };
    }
  
    setInputData(newInputData);
  };
  



  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newInputData = [...inputData];
   

    if (name === "numStudents"|| name === "numHours") {
      // Remove the old values for numStudents or numHours
      delete newInputData[index][name];
      setInputData(newInputData);
    }
    if (name === "stencilPages") {
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue) && newValue >= 1 && newValue <= 3) {
        newInputData[index] = { ...newInputData[index], [name]: newValue };
        setInputData(newInputData);
      } else {
        console.error("Invalid number of Stencil pages. Enter a number between 1 and 3.");
      }
    }

    if (name === "daysOfExam" ) {
        const newValue = parseInt(value,10);
        if( !isNaN(newValue)&& newValue >= 1 && newValue <= 4){
        newInputData[index] = { ...newInputData[index], [name]: newValue };
        setInputData(newInputData);
        }
        else {
          console.error("Selecting Days Of Exam is manadatory.");
        }
    }
    
    if (name === "numHours" || name === "daysOfExam") {
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
        newInputData[index] = { ...newInputData[index], [name]: newValue };
        setInputData(newInputData);
      } else {
        console.error("Invalid input. Enter a number between 1 and 4.");
      }
    }

    if (name === "numHours") {
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
        newInputData[index] = { ...newInputData[index], [name]: newValue };
        setInputData(newInputData);
      } else {
        console.error("Invalid number of hours. Enter a number between 1 and 4.");
      }
    } else if (name === "numStudents") {
      if (inputData[index].panelType === "Evaluating Answer Scripts" && value === "") {
        newInputData[index] = { ...newInputData[index], [name]: value };
        setInputData(newInputData);
        alert("Number of Students is mandatory for Evaluating Answer Scripts.");
      } else {
        newInputData[index] = { ...newInputData[index], [name]: value };
        setInputData(newInputData);
      }
    } else if (name === "tabulationType" || name === "tabulationSemester") {
      newInputData[index] = { ...newInputData[index], [name]: value };
      setInputData(newInputData);
    } else {
      newInputData[index] = { ...newInputData[index], [name]: value };
      setInputData(newInputData);
    }
  };
   
 
  
 

  const handleCalculate = () => {
    if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numStudents === 0)) {
     alert("Number of Students is mandatory for Evaluating Answer Scripts.");
      return;
    }
    
    if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numHours === 0)) {
      alert("Number of Hours is mandatory for Evaluating Answer Scripts.");
      return;
    }

    if (inputData.some(data => data.panelType === "Viva Exam" && data.numStudents === 0)) {
      alert("Number of Students is mandatory for Viva Exam.");
      return;
    }
 

    if (inputData.some(data => data.panelType === "Lab Exam" && data.numHours === 0)) {
      alert("Number of Hours is mandatory for Lab Exam.");
      return;
    }

    if (inputData.some(data => data.panelType === "Lab Exam" && data.daysOfExam === "--")) {
      alert("Number of Days is mandatory for Lab Exam.");
      return;
    }

    if (inputData.some(data => data.panelType === "Stencil" && data.stencilPages === "--")) {
      alert("Number of Pages is mandatory for Stencil.");
      return;
    }

    if (inputData.some(data => data.panelType === "Making Question Paper" && data.numHours === 0)) {
      alert("Number of Hours is mandatory for Making Question Paper.");
      return;
    }

    const results = inputData.map((data) => {
      let result = 0;
     
      if (data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam") {
        if (data.numStudents === 0) {
          alert("Number of Students is mandatory for Evaluating Answer Scripts/Viva Exam.");
        } 
      } 
   
      return { ...data, result };
    });

    console.log("Results after calculation:", results);
    const panelType = inputData[0].panelType;
    const department = encodeURIComponent(selectedDepartment);
    const semester = encodeURIComponent(selectedSemester);
    const name=encodeURIComponent(selectName);
    const bank_account_number=encodeURIComponent(selectBankAccNo);
    const type=encodeURIComponent(selectedType);
    console.log("Panel Type:", panelType);
  
  
  // Prepare data to be sent to the Django backend
  const formData = {
    semester: semester.replace(/%20/g, ' '),
    name: name.replace(/%20/g, ' ')
  };

  // Send a POST request to save data to the Django backend
  axios.post('http://localhost:8000/day4app/your-endpoint/', formData)
    .then(response => {
      // Handle success
      console.log("Data saved successfully:", response.data);
      // Optionally, perform any additional actions after data is saved
    })
    .catch(error => {
      // Handle error
      console.error("Error saving data:", error);
    });
    navigate(`/result?results=${JSON.stringify(results)}&panelType=${inputData[0].panelType}&department=${department}&semester=${semester}&name=${name}&type=${type}&bank_account_number=${props.bankAccountNumber}`);
  };

  const courseOptions = {
    "Computer Science and Engineering": [
      "Algorithms-I",
      "Algorithms-I-Lab",
      "Electronic Circuits",
      "Numerical Methods",
      "Web Design and Programming Laboratory-I",
      "Technical Writing and Presentations",
      "Database Systems",
      "Computational Geometry",
      "Structured Programming Language",
      "Java",
    ],
  };

  const courseToCodeMapping = {
    "Structured Programming Language":"CSE-105",
    "Structured Programming Language-Lab": "CSE-106",
    "Data Structures":"CSE 153",
    "Data Structures Lab":"CSE 154",
    "Discrete Mathematics":"CSE-155",
    "Algorithms-I": "CSE-209",
    "Algorithms-I-Lab": "CSE-210",
    "Electronic Circuits": "CSE-107",
    "Electronic Circuits LAB":"CSE-108",
    "Numerical Methods": "CSE-205",
    "Numerical Methods LAB":"CSE-206",
    "Web Design and Programming Laboratory-I":"CSE-312",
    "Technical Writing and Presentations":"CSE-112",
    "Database Systems":"CSE-255",
    "Computer Graphics":"CSE-303",
    "Computer Graphics LAB":"CSE-304",
    "Computational Geometry":"CSE-305",
    "Java":"CSE-212",
    "Operating Systems":"CSE-309",
    "Operating Systems Lab":"CSE-310",
     "Computer Ethics And Cyber Law":"CSE-203",
     "Digital Logic Design":"CSE-253",
     "Digital Logic Design LAB":"CSE-254",
     "Database System":"CSE-255",
     "Database System LAB":"CSE-256",
     "Algorithms II":"CSE-257",
     "Algorithms II LAB":"CSE-258",
     "Data and Telecommunication":"CSE-259",
     "Data and Telecommunication LAB.":"CSE-260",
     "Human Computer Interaction":"CSE-353",
     "Introduction to Bioinformatics":"CSE-355",
     "Microprocessors":"CSE-357",
     "Microprocessor And Assembly Language LAB":"CSE-358",
     "Computer Networks":"CSE-359",
     "Computer Networks LAB":"CSE-360",
     "Web Design and Programming Laboratory-II":"CSE-362",
     "Theory Of Computation And Application":"CSE-401",
     "Software Engineering And Information System Design":"CSE-403",
     "Software Engineering And ISD LAB.":"CSE-404",
     "Digital Image Processing":"CSE-405",
     "Digital Image Processing LAB":"CSE-406",
     "Wireless Networks":"CSE-407",
     "Mobile Application Development LAB":"CSE-410",
     "Thesis/Project/Report Evaluation":"CSE-440"
      
  };

  const semesterToCoursesMapping = {
    "1st Year 1st Semester": [
      "Structured Programming Language",
      "Structured Programming Language-Lab",
      "Electronic Circuits",
      "Electronic Circuits LAB",
  
    ],
    "1st Year 2nd Semester": [
      "Data Structures",
      "Data Structures Lab",
      "Discrete Mathematics",
      "Technical Writing and Presentations"
    ],

    "2nd Year 1st Semester": [
      "Algorithms-I",
      "Algorithms-I-Lab",
      "Numerical Methods",
      "Numerical Methods LAB",
      "Java",
      "Computer Ethics And Cyber Law"
    ],
    "2nd Year 2nd Semester": [
      "Digital Logic Design",
      "Digital Logic Design LAB",
      "Database System",
      "Database System LAB",
      "Algorithms II",
      "Algorithms II LAB",
      "Data and Telecommunication",
      "Data and Telecommunication LAB",
    ],

    "3rd Year 1st Semester": [
      "Web Design and Programming Laboratory-I",
      "Computational Geometry",
      "Operating Systems",
      "Operating Systems Lab",
      "Computer Graphics",
      "Computer Graphics LAB",
    ],
    "3rd Year 2nd Semester": [
      "Web Design and Programming Laboratory-II",
      "Introduction to Bioinformatics",
      "Microprocessors",
      "Microprocessor And Assembly Language LAB",
      "Computer Networks",
      "Computer Networks LAB",
      "Human Computer Interaction",
    ],
    "4th Year 1st Semester": [
      "Theory Of Computation And Application",
      "Software Engineering And Information System Design",
      "Software Engineering And ISD LAB.",
      "Digital Image Processing",
      "Digital Image Processing LAB",
      "Wireless Networks",
      "Mobile Application Development LAB",
      "Thesis/Project/Report Evaluation"

    ],

  
  };
  const courseOptionsForSelectedDepartment = courseOptions[selectedDepartment] || [];
  const courseOptionsForSelectedSemester = semesterToCoursesMapping[selectedSemester] || [];
  

  
  
  return (
    <div className="container mt-4 ">
     
      <div className="form-group select-container">
        <label htmlFor="selectedDepartment">Select Department:</label>
        <select
          className="form-control"
          aria-label="Disabled select example" disabled
          style={{height:'50px',fontSize:'20px'}}
          id="selectedDepartment"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="Computer Science and Engineering">Computer Science and Engineering</option>
        </select>
      </div>
      

      <div style={{ display: 'flex', gap: '20px' }}>
      <div className="form-group select-container" style={{ flex: 1 }}>
        <label htmlFor="selectName">Name:</label>
        <select
          className="form-control"
          aria-label="Disabled select example" disabled
          style={{height:'50px',fontSize:'20px'}}
          id="selectedDepartment"
          value={selectName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value={props.name}>{props.name}</option>
        </select>
      </div>
      <div className="form-group select-container" style={{ flex: 1 }}>
        <label htmlFor="selectName">Bank A/C No:</label>
        <select
          className="form-control"
          aria-label="Disabled select example" disabled
          style={{height:'50px',fontSize:'20px'}}
          id="selectedNo"
          value={selectBankAccNo}
          onChange={(e) => setSelectedBankAccNo(e.target.value)}
        >
          <option value={props.bankAccountNumber}>{props.bankAccountNumber}</option>
        </select>
      </div>
       
      {/* <div className="form-group" style={{ flex: 1 }}>
        <label htmlFor="bankAccountNumber">Bank Account Number:</label>
        <input
          type="text"
          className="form-control"
          id="bankAccountNumber"
          value={props.bankAccountNumber}
          readOnly
          style={{ height: '50px', fontSize: '20px' }}
        />
      </div> */}
    </div>
      
       
      <div className="form-group select-container">
        <label htmlFor="selectedCourseType">Select Type:</label>
        <select
          className="form-select form-select-lg mb-3"
          style={{height:'50px',fontSize:'20px'}}
          id="selectedType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="Hons">Hons</option>
          <option value="Msc">Msc</option>
  
        </select>
      </div>
    
     
      <div className="form-group select-container">
         <label htmlFor="selectedSemester" >Select Semester:</label>
         <select
          className="form-select form-select-lg mb-3"
          style={{height:'50px',fontSize:'20px'}}
          id="selectedSemester"
          value={selectedSemester}
          onChange={(e) => {
            setSelectedSemester(e.target.value);
            setCurrentSemester(e.target.value); // Update current semester when selected
            setInputData([]); // Clear panels when the semester changes
            
          }}
        >
          <option value="1st Year 1st Semester">1st Year 1st Semester</option>
           <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
           <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
           <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
           <option value="3rd Year 1st Semester">3rd Year 1st Semester</option>
           <option value="3rd Year 2nd Semester">3rd Year 2nd Semester</option>
           <option value="4th Year 1st Semester">4th Year 1st Semester</option>
           <option value="4th Year 2nd Semester">4th Year 2nd Semester</option>
         </select>
         </div>
         
         {/* <CourseFetcher teacherName={selectName} semester={selectedSemester} /> */}
   
       <CourseFetcher
        teacherName={selectName}
        semester={selectedSemester}
        fetchedCourses={fetchedCourses}
        setFetchedCourses={setFetchedCourses}
      />

<div className="form-group select-container" style={{ marginTop: '30px',letterSpacing: '1px' }}>
  <label htmlFor="RoutinecourseSelect">Select Your <i style={{color: 'blue'}}>ROUTINE COURSES</i>:</label>
  <div className="Routinecourse-checkboxes">
    {fetchedCourses.length === 0 ? (
      <p>No course(s) to select</p>
    ) : (
      fetchedCourses.map((course, optionIndex) => (
        <label
          key={optionIndex}
          className="checkbox-label"
          style={{
            backgroundColor: '#dfedea',
            borderWidth: '2px',
            borderColor: 'rgb(126, 123, 123)',
            margin: '17px',
            padding: '14px',
            width: '290px',
            height: '120px',
            display: 'inline-block',
            textAlign: 'start',
            boxShadow: '10px 8px 10px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ display: 'flex', flex: 'wrap', alignContent: 'center' }}>
            <div>
              <input
                type="checkbox"
                name="selectedCourse"
                value={course}
                onChange={handleCourseChange}
                checked={selectedCourses.includes(course)}
                className="checkbox-input"
                style={{ margin: '7px', width: '25px', height: '20px' }}
              />
            </div>
            <div style={{ marginTop: '2px', fontSize: '20px', textDecoration: 'none' }}>
              {course}
            </div>
          </div>
        </label>
      ))
    )}
  </div>
</div>


<div className="form-group select-container" style={{marginTop:'30px',letterSpacing: '1px'}}>
  <label htmlFor="courseSelect">Select Additional Courses<i style={{color: 'blue'}}> (In case you were the EXTERNAL/INVIGILATOR)</i>:</label>
  <div className="course-checkboxes">
    {courseOptionsForSelectedSemester
      .filter(course => !fetchedCourses.includes(course)) // Filter out already selected courses
      .map((course, optionIndex) => (
        <label key={optionIndex} className="checkbox-label" style={{backgroundColor:'#dfedea',boxShadow: '10px 8px 10px rgba(0, 0, 0, 0.4)', margin: '17px', padding: '14px', width: '290px',height:'120px', display: 'inline-block' , textAlign:'start'}}>
         <div style={{display:'flex',flex:'wrap',alignContent:'center'}}>
         <div> 
          <input
            type="checkbox"
            name="selectedCourse"
            value={course}
            onChange={handleCourseChange}
            checked={selectedCourses.includes(course)}
            className="checkbox-input" style={{ margin: '7px',width:'25px',height:'20px'}}
          />
          </div>
          <div style={{marginTop:'2px',fontSize:'20px',textDecoration:'none'}}>
          {course}
          </div>
          </div>
        </label>
      ))}
  </div>
  </div>
 
 {/* <div className="form-group select-container" style={{marginTop:'30px'}}>
  <label htmlFor="RoutinecourseSelect">Select Your Routine Courses:</label>
  <div className="Routinecourse-checkboxes">
    { fetchedCourses.map((course, optionIndex) => (
      <label key={optionIndex} className="checkbox-label" style={{backgroundColor:'#dfedea',borderWidth:'2px',borderColor:'rgb(126, 123, 123)', margin: '17px', padding: '14px', width: '290px',height:'120px', display: 'inline-block' , textAlign:'start'}}>
       <div style={{display:'flex',flex:'wrap',alignContent:'center'}}>
       <div> 
        <input
          type="checkbox"
          name="selectedCourse"
          value={course}
          onChange={handleCourseChange}
          checked={selectedCourses.includes(course)}
          className="checkbox-input" style={{ margin: '7px',width:'25px',height:'20px'}}
        />
        </div>
        <div style={{marginTop:'2px',fontSize:'20px',textDecoration:'none'}}>
        {course}
        </div>
        </div>
      </label>
      

    ))}
     
  </div>
</div>



 <div className="form-group select-container" style={{marginTop:'30px'}}>
  <label htmlFor="courseSelect">Select Additional Courses:</label>
  <div className="course-checkboxes">
    {courseOptionsForSelectedSemester.map((course, optionIndex) => (
      <label key={optionIndex} className="checkbox-label" style={{backgroundColor:'#dfedea',borderWidth:'2px',borderColor:'rgb(126, 123, 123)', margin: '17px', padding: '14px', width: '290px',height:'120px', display: 'inline-block' , textAlign:'start'}}>
       <div style={{display:'flex',flex:'wrap',alignContent:'center'}}>
       <div> 
        <input
          type="checkbox"
          name="selectedCourse"
          value={course}
          onChange={handleCourseChange}
          checked={selectedCourses.includes(course)}
          className="checkbox-input" style={{ margin: '7px',width:'25px',height:'20px'}}
        />
        </div>
        <div style={{marginTop:'2px',fontSize:'20px',textDecoration:'none'}}>
        {course}
        </div>
        </div>
      </label>
      

    ))}
     
  </div>
</div> */}





      {selectedCourses.length > 0 && (
      <div className="panel-border" >
      {/* <div className="row d-flex justify-content-center" style={{backgroundColor:'red'}}> */}
        {inputData.map((data, index) => (
          <div key={index} className="col-md-12" style={{borderRadius:'10px',padding:'4% 10px 10px 10px',margin:'50px' , boxShadow: '1px 8px 10px rgba(0, 0, 0, 0.5)' , backgroundImage: 'linear-gradient(to bottom, navy 20%, white 20%)'}}>
            <div className="p-3" style={{borderRadius:'9px'}}>
              <h1 id="PanelNo" style={{fontSize:'32px',padding:'2%',fontWeight:'5%',color:'white'}}># {data.courseName} ( {data.courseCode}) </h1>
              
            
   <div className="form-group select-container" style={{marginTop:'10%'}}>
  <label htmlFor={`courseName${index}`}>Course Name:</label>
  <input
    type="text"
    className="form-control"
    style={{height:'50px',fontSize:'20px'}}
    aria-label="Disabled select example" disabled
    id={`courseName${index}`}
    name="courseName"
    value={data.courseName}
    readOnly
  />
  </div>

<div className="form-group select-container">
  <label htmlFor={`courseCode${index}`}>Course Code:</label>
  <input
    type="text"  
    className="form-control"
    style={{height:'50px',fontSize:'20px'}}
    aria-label="Disabled select example" disabled
    id={`courseCode${index}`}
    name="courseCode"
    value={data.courseCode}
    readOnly
  />
</div>
<div className="form-group checkbox-container criteriaSelectHeading">
  <label>Criteria Of Work :</label>
  <div className="criteriaSelect">
  <div className="column-container">
  {["Making Question Paper", "Evaluating Answer Scripts", "Question Moderation", "Lab Exam", "Viva Exam", "Tabulation","Stencil","Thesis/Project/Report Evaluation"].map((panelType, idx) => (
    <div key={idx} className="column-item">
      <div className="criteriaSelectCheckbox"style={{display:'flex',flex:'wrap'}}>
        <div className="criteriaCheckbox">
      <input
        type="checkbox"
        id={`panelType${idx}`}
        name="panelType"
        value={panelType}
        checked={data.panelType.includes(panelType)}
        onChange={(e) => handlePanelTypeChange(e, panelType,index)}
        className="checkbox-input" 
         style={{ margin: '15px',width:'30px',height:'30px',}}
      />
      </div>
      <div className="criteriaCheckbox" style={{ margin: '9px'}}>
      <label htmlFor={`panelType${idx}`} style={{fontSize:'22px',cursor:'pointer'}}>{panelType}</label>
      </div>
      </div>
    </div>
  ))}
  </div>
</div>
</div>


{data.panelType.includes("Stencil") ? (
  <div className="form-group select-container">
    <label htmlFor={`stencilPages${index}`}>Number of Stencil Pages (1-3):</label>
    <select
      type="number"
      className="form-select form-select-lg mb-3"
      id={`stencilPages${index}`}
      name="stencilPages"
      value={data.stencilPages}
      required
      onChange={(e) => handleInputChange(e, index)}
      
    >
      <option value="0">--</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>
) : null}

{data.panelType.includes("Evaluating Answer Scripts") || data.panelType.includes("Viva Exam") | data.panelType.includes("Thesis/Project/Report Evaluation")? (
  // Render "Number of Students" field for other criteria, if needed
  <div className="form-group select-container">
    <label htmlFor={`numStudents${index}`}>Number of Students:</label>
    <select
      type="number"
      className={`form-select form-select-lg mb-3${data.panelType.includes("Evaluating Answer Scripts") || data.panelType.includes("Viva Exam") ? " mandatory" : ""}`}
      id={`numStudents${index}`}
      name="numStudents"
      value={data.numStudents}
      onChange={(e) => handleInputChange(e, index)}
    >
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="31">31</option>
      <option value="32">32</option>
      <option value="33">33</option>
      <option value="34">34</option>
      <option value="35">35</option>
      <option value="36">36</option>
      <option value="37">37</option>
      <option value="38">38</option>
      <option value="40">40</option>
      <option value="45">45</option>
      <option value="50">50</option>
      <option value="55">55</option>
      <option value="60">60</option>
      <option value="65">65</option>
    </select>
  </div>
) : null}

<div className="form-group select-container">
                <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
                 <select
                  type="number"
                  className="form-select form-select-lg mb-3"
                  id={`numHours${index}`}
                  name="numHours"
                  value={data.numHours}
                  onChange={(e) => handleInputChange(e, index)}
                > 
                  <option value="0">--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>

                </select>
                
              </div>

{data.panelType.includes("Lab Exam") ? (
  <div className="form-group select-container">
    <label htmlFor={`daysOfExam${index}`}>Days of Exam:</label>
    <select
      type="number"
      className="form-select form-select-lg mb-3"
      id={`daysOfExam${index}`}
      name="daysOfExam"
      value={data.daysOfExam}
      onChange={(e) => handleInputChange(e, index)}
      required
    >
      <option value="0">--</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  </div>
) : null}

            </div>
          </div>
        ))}
      {/* </div> */}
      </div>
       )}
      <div className="text-center"> {/* Center-align the button */}
        <button className="btn btn-primary btn-lg calculate-button" onClick={handleCalculate}>
          Prepare My Bill
        </button>
      </div>
    </div>
  );
}

export default InputForm;