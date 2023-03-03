import React, { useRef } from "react";
import Student from "../students/Student";
import "./StudentLesson.css"

const StudentLessons = (props) =>{
    const nameref = useRef();
    async function addStudent(event) {
        event.preventDefault();
        console.log("Hoi!")
        // const data = {name: document.getElementById("studentName").value}
        const data = {
            id: props.students.length+1,
            name: nameref.current.value}
        const dataJSON = JSON.stringify(data)
        await fetch("http://localhost:8082/api/student/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataJSON
        });
        console.log(data)
        const newStudents = props.students.concat(data)
        props.setStudents(newStudents)

    }
    return(
        <div>
             <div className="centered studentselect">
                <form className="addform" onSubmit={(event) => addStudent(event)}>
                    <label htmlFor="studentName">Student name: </label>
                    <input type="text" id="studentName" name='studentName' ref={nameref}></input>
                    <input type="submit" value="Add Student!"></input>
                </form>
            </div>

                <div>
                    List of Students:
                    <ul>
                        {props.students.map((students, index) => 
                        <Student 
                        key = {index}
                        name = {students.name}
                        />

                        )}
                    </ul>
                </div>
        </div>
    )
}
export default StudentLessons