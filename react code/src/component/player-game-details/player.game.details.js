import React, { useEffect, useState } from "react";
import getGameinfo from "./player.game.info.function";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  {
    field: "id",
    headerName: "id",
    sortable: true,
  },
  {
    field: "game",
    headerName: "Game",
    description: "This is name of game",
    sortable: true,
  },
  {
    field: "gameCode",
    headerName: "Game code",
    sortable: true,
  },
  {
    field: "opponent",
    headerName: "Opponent",
    description: "name of opponent",
    sortable: false,
  },
  {
    field: "progress",
    headerName: "Progress",
    sortable: true,
    description: "Is the game ongoing or concluded?",
  },
  {
    field: "result",
    headerName: "Result",
    sortable: true,
  },
];

export default () => {
  const [rows, changeRows] = useState([]);
  useEffect(() => {
    getGameinfo(changeRows);
    return () => {};
  }, []);
  let i = 0;
  if (rows.length === 0) {
    return (
      <>
        <hr
          style={{
            "border-width": "10px",
            "border-color": "white",
            margin: "45px 15px",
          }}
          hidden
        />
        <h1 className="past-detail-head">No past game</h1>
      </>
    );
  }
  return (
    <>
      <hr
        style={{
          "border-width": "10px",
          "border-color": "white",
          margin: "45px 15px",
        }}
        hidden
      />
      <h1 className="past-detail-head">Past Game Details</h1>
      <div className="game-detail">
        <div style={{ height: "fit-content", width: "100%" }}>
          <DataGrid
            rows={rows.map((ele) => {
              ele.id = ++i;
              return ele;
            })}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};
