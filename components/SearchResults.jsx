import React, { useContext } from 'react'
import { Context } from '../contextProvider/Context'
import Video from './Video'

function SearchResults() {
    const { videosData } = useContext(Context)
    
//--- Filter out channels from the videosData, keep only videos and playlists ---//
    const videosToDisplay = videosData.filter(item => !item.id.channelId)
         
    const videoElements = videosToDisplay.map(item => {
//--- Check if item is a video or a playlist and define id, url and description accordingly ---//
        const itemId = item.id.videoId ? (item.id.videoId) : (item.id.playlistId)
        const url = item.id.videoId ? 
            `https://www.youtube.com/watch?v=${item.id.videoId}` :
            `https://www.youtube.com/playlist?list=${item.id.playlistId}`
        const description = item.id.videoId ?
            (item.snippet.description) : 
            `A playlist by ${item.snippet.channelTitle}`
    
        return (
            <Video 
                key={itemId}
                url={url}
                src={item.snippet.thumbnails.medium.url}
                description={description}
                title={item.snippet.title}
                year={item.snippet.publishedAt.substring(0,4)}
            />
        )
    })
    
    return <>{videoElements}</>
}

export default SearchResults