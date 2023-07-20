import React, { useState } from 'react'
import sanitizeHtml from 'sanitize-html'

function Video(props) {
    const [hovered, setHovered] = useState(false)

    return (
        <div 
            className="video-item"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="image-wrapper">
                <a 
                    href={props.url} 
                    target="_blank">
                    <img 
                    src={props.src} 
                    className="thumbnail" 
                    alt={props.description}
                    />
                    {hovered && <i className="fa-solid fa-play play-movie"></i>}
                </a>
            </div>
            <h3 className="video__title" dangerouslySetInnerHTML={{__html: `${props.title} (${props.year})`}} />
        </div>
    )
}

export default Video