import React, { useState, useEffect, useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { SpeakerContext } from "../context/dropdownContext";

export const ThirdDropDown = () => {
  const { value, value2, value3 } = useContext(SpeakerContext);
  const [subCategory, setsubCategory] = useState([]);
  const [selectedId, setselectedId] = value;
  const [catId, setcatId] = value2;
  const [subCatId, setsubCatId] = value3;

  //Fetch the Category for each User
  async function getSubCategories(idCat, idSpk) {
    // console.log("getSubCategories: idSpk- " + idSpk + " ,idCat-" + idSpk);
    const response = await fetch(
      `https://api.itorah.com/api/Categories/subfilter?CategoryID=${idCat}&SpeakerID=${idSpk}`
    );
    //Converting to Json
    const body = await response.json();

    // console.log(body);

    //Setting the mainSpeakers
    setsubCategory(
      //Filter out Main Speakers
      body.reduce((subCategoryArray, item) => {
        var eachCategoryObj = {
          label: item.name,
          value: item.id,
          lectureCount: item.shiurCount,
        };
        subCategoryArray.push(eachCategoryObj);
        return subCategoryArray;
      }, [])
    );
  }

  useEffect(() => {
    getSubCategories(catId, selectedId);
  }, [catId]);

  const onSubCategorySelect = (evnt, idSubCat) => {
    evnt.preventDefault();
    // console.log("Outputting from Click: " + idSubCat);
    setsubCatId(idSubCat);
  };

  let disableValThirdDropDown = catId == 0;

  return (
    <DropdownButton
      show={!disableValThirdDropDown} //if "selectedId" is not null
      disabled={disableValThirdDropDown} //if "selectedId" is null
      id="dropdown-basic-button"
      title="All Categories"
      variant="light"
      className="menu"
    >
      {subCategory.map(({ label, value, lectureCount }) => (
        <Dropdown.Item
          key={value}
          onClick={(e) => onSubCategorySelect(e, value)}
        >
          {`${label} (${lectureCount})`}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};
