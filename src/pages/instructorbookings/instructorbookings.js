import React, { useRef, useState, useEffect } from "react";

const InstructorBookings = (props) => {
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [validDate, setValidDate] = useState(false)
    const [validTime, setValidTime] = useState(false)
    const [validTeacher, setValidTeacher] = useState(false)

    useEffect(()=>{
        console.log("useffect validteacher")
        console.log(validTeacher)},[])


    const idref = useRef()
    const timeref = useRef()
    const dateref = useRef()

    function validateDate(date) {
        if (date == null) {
            ToggleButton()
            setValidDate(false)
        }
        setValidDate(true)
        ToggleButton()
    }

    function validateTime(time) {
        if (time == null) {
            setValidTime(false)
            ToggleButton()
        }
        setValidTime(true)
        ToggleButton()
    }
    function validateTeacher(id) {
        console.log("validate teacher")
        console.log(id.current.value)
        if (Number(id.current.value) === 0) {
            console.log("Validteacher naar false!")
            setValidTeacher(true)
            ToggleButton()
        }
        else {
            console.log("validteacher naar true! " + id.current.value)
            setValidTeacher(false)
            ToggleButton()
        }

    }
    function ToggleButton() {
        console.log("button check!")
        console.log("validdate")
        console.log(validDate)
        console.log("Validtime")
        console.log(validTime)
        console.log("Validteacher")
        console.log(validTeacher)
        if (validDate === true && validTime === true && validTeacher === true) {
            console.log("knopje aan")
            setButtonDisabled(false)
        }

        else {
            setButtonDisabled(true)
            console.log("knopje uit")
        }
    }



    async function addLesson(event) {
        event.preventDefault();
        const data = {
            id: props.lessons.length + 1,
            date: dateref.current.value,
            time: timeref.current.value
        }
        const dataJSON = JSON.stringify(data)
        console.log(data)
        await fetch(`http://localhost:8082/api/teacher/${idref.current.value}/newlesson`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataJSON
        });
        const lessons = props.lessons.concat(data)
        props.setLessons(lessons)
        console.log(lessons)

    }
    return (
        <div>
            <form onSubmit={(event) => addLesson(event)}>
                <select ref={idref} onChange={() => validateTeacher(idref)}>
                    <option value={0}> no one </option>
                    {props.teachers.map((teachers, index) =>
                        <option value={teachers.id} key={index}>
                            {teachers.name}
                        </option>
                    )}
                </select>
                <label>Time</label>
                <input type="time" ref={timeref} onChange={() => validateTime(timeref)}></input>
                <label>Date</label>
                <input type="date" ref={dateref} onChange={() => validateDate(dateref)}></input>
                <input type="submit" value="Add Lesson!" disabled={buttonDisabled}></input>
            </form>
        </div>
    )
}
export default InstructorBookings