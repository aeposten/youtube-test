import React from 'react'

function Header() {
    return (
        <header>
            <div className="header-wrapper">
                <i className="fa-solid fa-play"></i>
                <h1>Channel <span className="light-blue">Search</span></h1>
            </div>
            <h2 className="header__subheading">Seach for videos about programming from popular YouTube channels</h2>
        </header>
    )
}

export default Header