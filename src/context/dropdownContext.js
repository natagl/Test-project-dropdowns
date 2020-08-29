import React, { useState } from "react";

export const SpeakerContext = React.createContext();

export const SpeakerProvider = (props) => {
  //States for Storing user Clicks
  const [selectedId, setselectedId] = useState(0);

  //States for Storing Category
  const [catId, setcatId] = useState(0);

  //States for Storing SubCategory
  const [subCatId, setsubCatId] = useState(0);

  //States for Storing SearchResult
  const [searchResult, setsearchResult] = useState([]);

  return (
    <SpeakerContext.Provider
      value={{
        value: [selectedId, setselectedId],
        value2: [catId, setcatId],
        value3: [subCatId, setsubCatId],
        value4: [searchResult, setsearchResult],
      }}
    >
      {props.children}
    </SpeakerContext.Provider>
  );
};
