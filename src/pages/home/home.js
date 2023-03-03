import React from "react";
import Student from "../students/Student";
import Teacher from "../teachers/Teacher";
import "./home.css"

const Home = (props) =>{
    return(
        <div className="homelists">
            <div className = "homelistcontainer">student lijst: 
                <ul>
                {props.students.map((students, index) =>
                <li
                key = {index}>
                <Student 
                key = {index}
                name = {students.name}
                />
                </li>
                )}
                </ul>
            </div>
            <div className = "homelistcontainer">teacher lijst: 
                <ul>
            {props.teachers.map((teachers, index) =>
            <li
            key = {index}>
                <Teacher 
                key = {index}
                name = {teachers.name}
                />
            </li>
                )}

                </ul>
            </div>
        </div>
    )
}
export default Home