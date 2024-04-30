"use server";
import { getPlayers } from "@/actions/players";
import { getTeam } from "@/actions/teams";
import TeamsCard from "@/components/teams/TeamsCard";
import React from "react";

async function OneTeamPage({ params }) {
  const team = await getTeam(params.teamId);
  const players = await getPlayers();

  const members = players.filter((player) => team.id === player.teamId.id);

  return (
    <main className="w-full h-screen flex flex-col gap-4">
      <h1 className="text-center text-3xl font-semibold">Team {team.name}</h1>

      <div className="flex justify-center items-center mx-auto w-1/2">
        <TeamsCard
          id={team.id}
          name={team.name}
          slogan={team.slogan}
          members={members}
        />
      </div>
    </main>
  );
}

export default OneTeamPage;
