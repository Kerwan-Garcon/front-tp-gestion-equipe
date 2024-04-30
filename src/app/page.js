"use server";
import { getTeams } from "@/actions/teams";
import TeamFormDialog from "@/components/teams/TeamFormDialog";
import Teams from "@/components/teams/Teams";

export default async function Home() {
  const teams = await getTeams();

  return (
    <main className="h-screen flex flex-col gap-2">
      <h1 className="text-center text-3xl font-semibold">
        Welcome to the home page! Here you can see all the teams
      </h1>

      <div className="flex flex-col gap-4 mx-auto w-1/2 mt-5">
        <TeamFormDialog content={"Ajouter une équipe"} />
        <Teams teams={teams} display="table" />
      </div>
    </main>
  );
}
