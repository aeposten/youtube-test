import React, { useState } from "react";
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
    const URL = "https://tangerine-torte-2fd1e5.netlify.app/.netlify/functions/fetch-videos";

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channelId, searchValue }),
    })
      .then((res) => {
        if (!res.ok) {
          setHasData(false);
          console.log("res.ok === false");
          setErrorMessage(
            "The search engine is currently unavailable. Please try again later."
          );
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (!data) {
          setHasData(false);
          console.log("No data found");
          setErrorMessage(
            "The search engine is currently unavailable. Please try again later."
          );
          return;
        } else if (!data.items.length) {
          setHasData(false);
          console.log("No data found");
          setErrorMessage(
            "Sorry, there are no videos matching your search. Please try another search."
          );
        } else {
          setHasData(true);
          setVideosData(data.items);
        }
      });
  }

//   function searchForVideos(e) {
//     const URL =
//       "https://tangerine-torte-2fd1e5.netlify.app/.netlify/functions/fetch-videos";
//     const KEY = "AIzaSyC-0bMXoBYRfR1Gp5k1JCVNy38cgIX_IHk";
//     fetch(
//       `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${KEY}&maxResults=10&channelId=${channelId}&q=${searchValue}`
//     )
//       .then((res) => {
//         if (!res.ok) {
//           setHasData(false);
//           console.log("res.ok === false");
//           setErrorMessage(
//             "The search engine is currently unavailable. Please try again later."
//           );
//         } else {
//           return res.json();
//         }
//       })
//       .then((data) => {
//         if (!data) {
//           setHasData(false);
//           console.log("No data found");
//           setErrorMessage(
//             "The search engine is currently unavailable. Please try again later."
//           );
//           return;
//         } else if (!data.items.length) {
//           setHasData(false);
//           console.log("No data found");
//           setErrorMessage(
//             "Sorry, there are no videos matching your search. Please try another search."
//           );
//         } else {
//           setHasData(true);
//           setVideosData(data.items);
//         }
//       });
//   }

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
