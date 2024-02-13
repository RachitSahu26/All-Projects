import React from 'react'
import "../NavBar/NavBar.scss"
function NavBar() {
    return (

        <div class="navbar">
            <div class="logo">Logo</div>
            <ul class="nav-links">
                <li><a href="#">Cricket Series List</a></li>
                <li><a href="#">Cricket Series Search</a></li>
                <li><a href="#">All Matches List</a></li>
                <li><a href="#">All Players List</a></li>
            </ul>

        </div>
    )
}

export default NavBar
