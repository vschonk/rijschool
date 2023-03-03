import './App.css';
import { Route, Routes} from 'react-router-dom'
import {useEffect, useState} from 'react';
import Nav from './pages/nav/nav';
import Home from './pages/home/home';
import InstructorSelect from './pages/instructorselect/instructorSelect';
import InstructorBookings from './pages/instructorbookings/instructorbookings';
import BookLesson from './pages/bookalesson/BookLesson';
import StudentLessons from './pages/studentlessons/StudentLessons';

function App() {

  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])
  const [lessons, setLessons] = useState([])

  useEffect(()=>{
    fetch('http://localhost:8082/api/teacher/all').then((response)=>response.json())
    .then((teachersjson) => setTeachers(teachersjson))
    fetch('http://localhost:8082/api/student/all').then((response)=>response.json())
    .then((studentsjson) => setStudents(studentsjson))
    fetch('http://localhost:8082/api/lesson/all').then((response)=>response.json())
    .then((lessonjson) => setLessons(lessonjson))
  },[])

  useEffect(()=>{
    console.log(teachers)
  },[teachers])
  useEffect(()=>{
    console.log(students)
  },[students])
  useEffect(()=>{
    console.log(lessons)
  },[lessons])


  return (
    <div>
        <Nav />
        
        <Routes>
          <Route path='/' element={<Home
              teachers={teachers}
              students={students}
          />}/>
          <Route path='/instructorselect' element={<InstructorSelect
          teachers = {teachers}
          setTeachers = {setTeachers}
          />}/>
          <Route path='/instructorbookings' element={<InstructorBookings
          teachers = {teachers}
          lessons = {lessons}
          setLessons = {setLessons}
          />}/>
          <Route path='/bookalesson' element={<BookLesson
            teachers = {teachers}
            lessons = {lessons}
            students = {students}
            setLessons = {setLessons}
          />}/>
          <Route path='/studentlessons' element={<StudentLessons
              students={students}
              setStudents={setStudents}
          />}/>

        </Routes>
    </div>
  );
}

export default App
