"use server";

import { revalidatePath } from "next/cache";

const baseUrl = "http://localhost:8081/api";

export const getPlayers = async () => {
  const response = await fetch(`${baseUrl}/players`);
  const players = await response.json();
  return players;
};

export const addPlayer = async (player) => {
  console.log(player);
  const response = await fetch(`${baseUrl}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  });

  if (response.ok) {
    revalidatePath("/");
    revalidatePath("/team/[teamId]", "page");
  } else {
    console.log("Error adding player");
  }
};

export const deletePlayer = async (id) => {
  const response = await fetch(`${baseUrl}/players/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    revalidatePath("/");
  } else {
    console.log("Error deleting player");
  }
};

export const updatePlayer = async (player) => {
  const response = await fetch(`${baseUrl}/players/${player.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  });

  if (response.ok) {
    revalidatePath("/");
  } else {
    console.log("Error updating player");
  }
};
