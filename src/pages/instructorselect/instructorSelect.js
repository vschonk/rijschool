import React, { useRef, useState, useEffect } from "react";
import Teacher from "../teachers/Teacher";
import "./InstructorSelect.css"
import Lesson from "../lesson/lesson";

const InstructorSelect = (props) => {
    const [selectedTeacherId, SelectTeacher] = useState(0)
    const [teacherLessonList, setTeacherLessonlist] = useState([])

    useEffect(() => {
        SelectTeacher(0)
    }, [])

    useEffect(() => {
        console.log(selectedTeacherId)
        buildLessonArray(selectedTeacherId)
    }, [selectedTeacherId])

    useEffect(() => {
        console.log(teacherLessonList)
    }, [teacherLessonList])

    async function buildLessonArray(id) {
        if (id === "no one"){
            console.log("niks!")
            setTeacherLessonlist([])
        }
        else{
        console.log(id)
        await fetch(`http://localhost:8082/api/lesson/all/${id}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((responseJson) => setTeacherLessonlist(responseJson))
    }}

    const nameref = useRef()
    async function addInstructor(event) {
        event.preventDefault();
        console.log("Hoi!")
        const data = {
            name: nameref.current.value,
            id: props.teachers.length + 1
        }
        const dataJSON = JSON.stringify(data)
        await fetch("http://localhost:8082/api/teacher/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataJSON
        });
        console.log(data)
        const teachers = props.teachers.concat(data)
        props.setTeachers(teachers)
    }
    function CheckSelection(id) {
        SelectTeacher(id)
    }

    return (
        <div>
            <div className="centered instructorSelect">
                <form className="addform" onSubmit={(event) => addInstructor(event)}>
                    <label htmlFor="instructorName">Instructor name: </label>
                    <input type="text" id="instructorName" name='instructorName' ref={nameref}></input>
                    <input type="submit" value="Add instructor"></input>
                </form>
            </div>
            <div>
                List of Teachers:
                <ul>
                    {props.teachers.map((teachers, index) =>
                        <li
                            key={index}>
                            <Teacher
                                key={index}
                                name={teachers.name}
                            />
                        </li>
                    )}
                </ul>
            </div>
            <div>
                <select id="teachers" name="teachers" onChange={(event) => CheckSelection(event.target.value)}>
                    <option value={null}> no one </option>
                    {props.teachers.map((teachers, index) =>
                        <option value={teachers.id} key={index}>
                            {teachers.name}
                        </option>
                    )}
                </select>
            </div>
            <div>
                List of Lessons:
                <ul>
                    {teacherLessonList.length !== 0 && teacherLessonList.map((lesson, index) =>
                        <li
                        key={index}>
                        <Lesson
                            key={index}
                            date={lesson.date}
                            time={lesson.time}
                            studentname={lesson.student.name}
                        />
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
export default InstructorSelect