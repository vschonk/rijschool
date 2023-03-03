import React from "react"

const Lesson = (props) =>{

    function getStudentName(name){
        if (name === null){
            return ""
        }
        return name

    }

    return(
        <>{props.date} - {props.time} - {getStudentName(props.studentname)}</>
        
    )
}

export default Lesson