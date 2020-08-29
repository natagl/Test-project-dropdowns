import React, { useState, useEffect, useContext } from "react";

import Table from "react-bootstrap/Table";

import { SpeakerContext } from "../context/dropdownContext";

export const TableResult = () => {
  const { value4 } = useContext(SpeakerContext);
  const [searchResult, setsearchResult] = value4;

  // useEffect(() => {
  //   //setsearchResult([]);
  // }, [searchResult]);

  return (
    <Table show={false} striped bordered hover>
      <thead>
        <tr>
          <th>Speaker Name</th>
          <th>Sponsor</th>
          <th>Lecture Title</th>
          <th>Audio/Video Icon</th>
        </tr>
      </thead>
      <tbody>
        {searchResult.map(({ value, spk, sponsor, lecture, avIcon }) => (
          <tr key={value}>
            <td>{spk}</td>
            <td>{sponsor}</td>
            <td>{lecture}</td>
            <td>{avIcon}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
