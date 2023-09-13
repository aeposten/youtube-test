import React, { useState } from "react";
import axios from 'axios';
import channelData from "../utils/channelData";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [channelId, setChannelId] = useState(channelData[0].id);
  const [searchValue, setSearchValue] = useState("");
  const [videosData, setVideosData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasData, setHasData] = useState(false);

  const buttonClass = searchValue ? "enabled" : "disabled";

  function handleSelectChange(e) {
    setChannelId(e.target.value);
  }

  function handleSearchFieldChange(e) {
    setSearchValue(e.target.value);
  }

  function searchForVideos(e) {
    e.preventDefault()
    const URL = "https://tangerine-torte-2fd1e5.netlify.app/.netlify/functions/fetch-videos";
  
    axios.post(URL, { channelId, searchValue }, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then((res) => {
      if (!res.data) {
        setHasData(false);
        setErrorMessage(
          "The search engine is currently unavailable. Please try again later."
        );
        return;
      } else if (!res.data.items || !res.data.items.length) {
        setHasData(false);
        setErrorMessage(
          "Sorry, there are no videos matching your search. Please try another search."
        );
      } else {
        setHasData(true);
        setVideosData(res.data.items);
      }
    })
    .catch((error) => {
      setHasData(false);
      setErrorMessage(
        "The search engine is currently unavailable. Please try again later."
      );
    });
  }

  return (
    <Context.Provider
      value={{
        searchValue,
        handleSearchFieldChange,
        handleSelectChange,
        videosData,
        searchForVideos,
        buttonClass,
        errorMessage,
        hasData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
