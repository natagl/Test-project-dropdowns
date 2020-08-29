import React, { useState, useEffect, useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { SpeakerContext } from "../context/dropdownContext";

export const SecondDropDown = () => {
  const spkIdFromFirstDrop = 0;

  const { value, value2 } = useContext(SpeakerContext);
  const [category, setCategory] = useState([]);
  const [selectedId, setselectedId] = value;
  const [catId, setcatId] = value2;

  //Fetch the Category for each User
  async function getCategories(idSpk) {
    console.log("getCategories: " + idSpk);
    const response = await fetch(
      `https://api.itorah.com/api/Categories/catfilter?SpeakerID=${idSpk}`
    );
    //Converting to Json
    const body = await response.json();

    console.log(body);

    //Setting the mainSpeakers
    setCategory(
      //Filter out Main Speakers
      body.reduce((categoryArray, item) => {
        var eachCategoryObj = {
          label: item.name,
          value: item.id,
          lectureCount: item.shiurCount,
        };
        categoryArray.push(eachCategoryObj);
        return categoryArray;
      }, [])
    );
  }

  useEffect(() => {
    getCategories(selectedId);
  }, [selectedId]);

  const onCategorySelect = (evnt, idCat) => {
    evnt.preventDefault();
    console.log("Outputting from Click: " + idCat);
    setcatId(idCat);
  };

  console.log("Second file: " + selectedId);
  let disableValSecondDropDown = selectedId == 0;
  console.log("disableVal: " + disableValSecondDropDown);

  return (
    <DropdownButton
      show={!disableValSecondDropDown} //if "selectedId" is not null
      disabled={disableValSecondDropDown} //if "selectedId" is null
      id="dropdown-basic-button"
      title="All Categories"
      variant="light"
    >
      {category.map(({ label, value, lectureCount }) => (
        <Dropdown.Item key={value} onClick={(e) => onCategorySelect(e, value)}>
          {`${label} (${lectureCount})`}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};
