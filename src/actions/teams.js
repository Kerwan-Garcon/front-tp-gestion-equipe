"use server";

import { revalidatePath } from "next/cache";
import { addPlayer } from "./players";

const baseUrl = "http://localhost:8081/api";

export const getTeams = async () => {
  const response = await fetch(`${baseUrl}/teams`);
  const teams = await response.json();
  return teams;
};

export const addTeam = async (datas) => {
  const team = {
    name: datas.name,
    slogan: datas.slogan,
  };

  const members = datas.members.map((member) => {
    return {
      name: member.name,
      numero: member.number,
      position: member.position,
    };
  });

  try {
    const response = await fetch(`${baseUrl}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    });

    if (response.ok) {
      const team = await response.json();
      console.log(team);
      members.forEach(async (element) => {
        await addPlayer({ ...element, teamId: team });
      });
      revalidatePath("/");
      revalidatePath("/team/[teamId]", "page");
    } else {
      console.log("Error adding team");
    }
  } catch (error) {
    console.log("Error adding team", error);
  }
};

export const deleteTeam = async (id) => {
  const response = await fetch(`${baseUrl}/teams/${Number(id)}`, {
    method: "DELETE",
  });

  if (response.ok) {
    revalidatePath("/");
  } else {
    console.log("Error deleting team");
  }
};

export const updateTeam = async (team, id) => {
  const response = await fetch(`${baseUrl}/teams/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });

  if (response.ok) {
    console.log(response.json());
    revalidatePath("/team/[teamId]", "page");
    revalidatePath("/");
  } else {
    console.log("Error updating team");
  }
};

export const getTeam = async (id) => {
  const response = await fetch(`${baseUrl}/teams/${id}`);
  const team = await response.json();
  return team;
};
