import React from "react";
import TeamsCard from "./TeamsCard";
import TeamsTable from "./TeamsTable";

function Teams({ teams, display = "card" }) {
  return teams.map((team) => {
    return display === "card" ? (
      <TeamsCard key={team.id} {...team} />
    ) : (
      <TeamsTable key={team.id} {...team} />
    );
  });
}

export default Teams;
