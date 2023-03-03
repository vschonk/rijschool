import React, { useRef } from "react";

const BookLesson = (props) =>{
    const studentIdRef = useRef()
    const lessonIdRef = useRef()


    async function addStudentToLesson(event){
        event.preventDefault()
        await fetch(`http://localhost:8082/api/student/${studentIdRef.current.value}/${lessonIdRef.current.value}`,
        {method: "PUT"}
        )

        }

    return(
        <div>
            <h1>select a student and a lesson</h1>
            <form onSubmit={(event) => addStudentToLesson(event)}>
                <select ref={studentIdRef}>
                    <option value={null}>no one</option>
                    {props.students.map((student, index) => 
                    <option value={student.id} key={index}>
                        {student.name}
                    </option>
                    )}
                </select>

                <select ref={lessonIdRef}>
                    <option value={null}>no lesson</option>
                    {props.lessons.map((lesson, index) =>
                    <option value={lesson.id} key={index}>
                        {lesson.time} {lesson.date}
                        </option>)}
                </select>
                <input type="submit" value="Book the lesson! YEAH!"></input>
            </form>
        </div>
    )
}
export default BookLesson