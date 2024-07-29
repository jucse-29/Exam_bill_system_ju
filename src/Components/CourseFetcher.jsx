// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const CourseFetcher = ({ teacherName, semester }) => {
// //   const [courses, setCourses] = useState([]);

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:8000/day4app/api/get-courses/?teacher=${teacherName}&semester=${semester}`);
// //         setCourses(response.data.courses);
// //         console.log('Courses from backend:', response.data.courses);

// //       } catch (error) {
// //         console.error('Error fetching courses:', error);
// //       }
// //     };

// //     fetchCourses();
// //   }, [teacherName, semester]);

// //   return courses;
// // };

// // export default CourseFetcher;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CourseFetcher = ({ teacherName, semester, selectedCourses, setSelectedCourses }) => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/day4app/api/get-courses/?teacher=${teacherName}&semester=${semester}`);
//         setCourses(response.data.courses);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchCourses();
//   }, [teacherName, semester]);

//   useEffect(() => {
//     // When courses are fetched, select them if they are not already selected
//     const newSelectedCourses = courses.filter(course => !selectedCourses.includes(course));
//     setSelectedCourses(prevSelectedCourses => [...prevSelectedCourses, ...newSelectedCourses]);
//   }, [courses, selectedCourses, setSelectedCourses]);

//   return null; // CourseFetcher component doesn't render anything directly
// };

// export default CourseFetcher;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseFetcher = ({ teacherName, semester, fetchedCourses, setFetchedCourses }) => {
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/day4app/api/get-courses/?teacher=${teacherName}&semester=${semester}`);
        const coursesFromBackend = response.data.courses;
        // setFetchedCourses(prevCourses => [...prevCourses, ...coursesFromBackend]);
        setFetchedCourses(coursesFromBackend);
        console.log("Fetched courses:", coursesFromBackend);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [teacherName, semester, setFetchedCourses]);

  return null; // CourseFetcher component doesn't render anything directly
};

export default CourseFetcher;

