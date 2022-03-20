import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const Navbar = () => {
    return (
        <div className='nav'>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/About">About</Link>
            </ul>
        </div>
    )
}

export default Navbar