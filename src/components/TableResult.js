import React, { useState, useEffect, useContext } from "react";

import Table from "react-bootstrap/Table";
import avlogo from "./AVICON.ico";

import { SpeakerContext } from "../context/dropdownContext";

export const TableResult = () => {
  const { value4 } = useContext(SpeakerContext);
  const [searchResult, setsearchResult] = value4;

  // useEffect(() => {
  //   //setsearchResult([]);
  // }, [searchResult]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Speaker Name</th>
          <th>Sponsor</th>
          <th>Lecture Title</th>
          <th>Audio/Video Icon</th>
        </tr>
      </thead>
      <tbody>
        {searchResult.map(
          ({ value, speaker, sponsor, lectureTitle, avIcon }) => (
            <tr key={value}>
              <td>{speaker}</td>
              <td>{sponsor}</td>
              <td>{lectureTitle}</td>
              <td>{avIcon}</td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};
