import React, { useContext } from 'react'
import { Context } from '../contextProvider/Context'
import SearchResults from './SearchResults'
import Error from './Error'

function Main() {
    const { hasData } = useContext(Context)
    
    return (
        <main>
            <h2 className="main__subheading">Movies 2023</h2>
            <div className="video-container">
                { hasData ? <SearchResults /> : <Error /> }
            </div>
        </main>
    )
}

export default Main