import React, { useState, useEffect, useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { SpeakerContext } from "../context/dropdownContext";

export const FirstDropDown = () => {
  const initialState = { label: "Loading ...", value: "" };
  //States for Speakers
  const [mainSpeakers, setmainSpeakers] = useState([initialState]);
  const [otherSpeakers, setotherSpeakers] = useState([initialState]);

  //States for API fetching
  const [loading, setloading] = useState(true);

  //States for Storing user Clicks
  const { value /*value2*/ } = useContext(SpeakerContext);
  //const [catId, setcatId] = value2;
  const [selectedId, setselectedId] = value;

  useEffect(() => {
    async function getSpeakers() {
      const response = await fetch(
        "https://api.itorah.com/api/Speakers/allspeakers"
      );
      //Converting to Json
      const body = await response.json();

      //Setting the mainSpeakers
      setmainSpeakers(
        //Filter out Main Speakers
        body.reduce((mainSpeakerArray, item) => {
          if (item.isMainSpeaker) {
            var mainSpeaker = {
              label: item.speaker,
              value: item.id,
            };
            mainSpeakerArray.push(mainSpeaker);
          }
          return mainSpeakerArray;
        }, [])
      );

      //Setting the otherSpeakers
      setotherSpeakers(
        //Filter out Non-main Speakers
        body.reduce((otherSpeakerArray, item) => {
          if (item.isMainSpeaker === false) {
            var otherSpeaker = {
              label: item.speaker,
              value: item.id,
            };
            otherSpeakerArray.push(otherSpeaker);
          }
          return otherSpeakerArray;
        }, [])
      );

      setloading(false);
    }
    getSpeakers();
  }, []);

  const onSpeakerSelect = (evnt, spkId) => {
    evnt.preventDefault();
    console.log("Outputting from Click: " + spkId);
    setselectedId(spkId);
  };

  return (
    <DropdownButton
      show={!loading} //if "loading" is false
      disabled={loading} //if "loading" is true
      id="dropdown-basic-button"
      title="All Speakers"
      variant="light"
      className="menu"
    >
      {mainSpeakers.map(({ label, value }) => (
        <Dropdown.Item key={value} onClick={(e) => onSpeakerSelect(e, value)}>
          {label}
        </Dropdown.Item>
      ))}
      <Dropdown.Item>
        <br />
      </Dropdown.Item>
      <Dropdown.Item>
        <br />
      </Dropdown.Item>
      {otherSpeakers.map(({ label, value }) => (
        <Dropdown.Item key={value} onClick={(e) => onSpeakerSelect(e, value)}>
          {label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};
