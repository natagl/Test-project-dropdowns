import React, { useContext } from "react";

import Table from "react-bootstrap/Table";
import avlogo from "./AVICON.ico";

import { SpeakerContext } from "../context/dropdownContext";

function imageFormatter(cell, row) {
  return "<img src='./AVICON.ico'/>";
}

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
              <td>
                <div>
                  {avIcon ? (
                    <img style={{ height: "20%", width: "20%" }} src={avlogo} />
                  ) : (
                    {}
                  )}
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};
