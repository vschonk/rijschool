import { NavLink } from "react-router-dom"
import './nav.css'

const Nav = () => {
    return(
        <div className="navheader">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/instructorselect'>Select Instructor</NavLink>
        <NavLink to='/instructorbookings'>Instructor Bookings</NavLink>
        <NavLink to='/bookalesson'>Book a lesson</NavLink>
        <NavLink to='/studentlessons'>Students</NavLink>
         </div>
   )
}
export default Nav