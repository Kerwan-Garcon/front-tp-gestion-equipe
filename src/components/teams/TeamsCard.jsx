"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import TeamFormDialog from "./TeamFormDialog";

function TeamsCard({ id, name, slogan, members }) {
  const content = (
    <Card className="w-full" key={id}>
      <CardHeader>
        <CardTitle>
          #{id} {name}
        </CardTitle>
      </CardHeader>
      <CardDescription>{slogan}</CardDescription>
      <CardContent className="flex flex-col gap-2 justify-start items-start w-full">
        <h2 className="underline text-xl font-bold">Membres</h2>
        <ul className="flex flex-col gap-4 pl-4">
          {members.map((member) => (
            <li key={member.id}>
              #{member.id} {member.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
  return (
    <TeamFormDialog
      name={name}
      id={id}
      slogan={slogan}
      members={members}
      content={content}
    />
  );
}

export default TeamsCard;
