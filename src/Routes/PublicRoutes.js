import React from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout";
import ResultListing from "../Pages/Results/ResultListing";
import ResultForm from '../Pages/Results/ResultForm';
import CourseLisitng from '../Pages/Courses/CourseLisitng';
import CourseForm from '../Pages/Courses/CourseForm';
import Home from '../Pages/Home/Home';
import StudentsListing from '../Pages/Students/StudentsListing';
import StudentForm from '../Pages/Students/StudentForm';

const PublicRoutes=()=>{
    return(
		<Layout>  
			<Routes>  
				<Route path="/" element={<Home/>}/>
				<Route path="/results" element={<ResultListing/>}/>
				<Route path="/results/form" element={<ResultForm/>}/>
				<Route path="/courses" element={<CourseLisitng/>}/>
				<Route path="/courses/form" element={<CourseForm/>}/>
				<Route path="/students" element={<StudentsListing/>}/>
				<Route path="/students/form" element={<StudentForm/>}/>
			</Routes>
		</Layout>  
    )
}

export default PublicRoutes;