import React, { useContext } from 'react'
import { Context } from '../contextProvider/Context'
import channelData from '../utils/channelData'

function Form() {
    const {
        searchValue, 
        handleSearchFieldChange, 
        handleSelectChange, 
        buttonClass, 
        searchForVideos
        } = useContext(Context)
    
    const optionElements = channelData.map(item => {
        return <option key={item.id} value={item.id}>{item.title}</option>
    })
    
    return (
        <section className="form-container">
            <form>
                <label htmlFor="select-channel">Choose a YouTube channel</label>
                <select 
                    name="select-channel" 
                    id="select-channel" 
                    onChange={e => handleSelectChange(e)}
                >
                    <>{optionElements}</>
                </select>
                <label htmlFor="search-field">Search for videos</label>
                <input 
                    type="text" 
                    name="search-field" 
                    id="search-field"
                    value={searchValue} 
                    placeholder="Search"
                    required
                    onChange={e => handleSearchFieldChange(e)}/>
                <button 
                    className={buttonClass}
                    onClick={e => searchForVideos(e)}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </form>
        </section>
    )
}

export default Form