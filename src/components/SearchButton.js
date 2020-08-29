import React, { useContext } from "react";

import Button from "react-bootstrap/Button";

import { SpeakerContext } from "../context/dropdownContext";

export const SearchButton = () => {
  const { value, value2, value3, value4 } = useContext(SpeakerContext);
  const [selectedId, setselectedId] = value;
  const [catId, setcatId] = value2;
  const [subCatId, setsubCatId] = value3;
  const [searchResult, setsearchResult] = value4;

  //Fetch the Category for each User
  async function getSearchResults() {
    /*console.log(
      "getSearchResults: idSpk- " +
        selectedId +
        " ,idCat-" +
        catId +
        " ,idSubCat-" +
        subCatId
    );*/
    const idCatOrSubCat = subCatId != 0 ? subCatId : catId;
    // console.log(idCatOrSubCat);
    const response = await fetch(
      `https://api.itorah.com/api/Shiurim/all?PageIndex=1&PageSize=20&CategoryID=${idCatOrSubCat}&SpeakerID=${selectedId}`
    );
    //Converting to Json
    const body = await response.json();

    // console.log(body.shiurList);

    setsearchResult(
      //Filter out Main Speakers
      body.shiurList.reduce((resultArray, item) => {
        let avIconShow = false;
        if (item.video !== "" || item.audio !== "") {
          avIconShow = true;
        }
        var eachSpeaker = {
          value: item.id,
          speaker: item.speaker,
          sponsor: item.sponsor,
          lectureTitle: item.title,
          avIcon: avIconShow,
        };

        resultArray.push(eachSpeaker);
        return resultArray;
      }, [])
    );
  }

  const onSearchButtonClick = (evnt) => {
    evnt.preventDefault();
    //console.log("SEARCH BUTTON CLICKED");
    if (selectedId != 0 && (catId != 0 || subCatId != 0)) {
      getSearchResults();
    } else {
      alert("Please select proper values from DropDown");
    }
  };

  return (
    <Button variant="light" onClick={(e) => onSearchButtonClick(e)}>
      Search
    </Button>
  );
};
