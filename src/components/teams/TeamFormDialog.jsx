"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { addTeam, updateTeam } from "@/actions/teams";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function TeamFormDialog({ name, slogan, content, id, members }) {
  const [formValues, setFormValues] = useState({
    name: name || "",
    slogan: slogan || "",
    members: members || [],
  });

  const handleAddMember = () => {
    setFormValues((prevState) => ({
      ...prevState,
      members: [...prevState.members, { name: "", number: "", position: "" }],
    }));
  };

  const handleMemberInputChange = (index, fieldName, value) => {
    const newMembers = [...formValues.members];
    newMembers[index][fieldName] = value;
    setFormValues((prevState) => ({
      ...prevState,
      members: newMembers,
    }));
  };

  const handleRemoveMember = (index) => {
    const newMembers = [...formValues.members];
    newMembers.splice(index, 1);
    setFormValues((prevState) => ({
      ...prevState,
      members: newMembers,
    }));
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-slate-800 px-4 py-2 text-white w-full">
        {content}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {id ? "Modifier une équipe" : "Ajouter une équipe"}
          </DialogTitle>
          <DialogDescription>
            Ajouter votre nouvelle équipe avec ce formulaire
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-2">
          <Label htmlFor="team-name">Nom</Label>
          <Input
            type="text"
            name="name"
            placeholder="Nom de l'équipe"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
          <Label>Slogan</Label>
          <Input
            type="text"
            name="slogan"
            placeholder="Slogan de l'équipe"
            value={formValues.slogan}
            onChange={(e) =>
              setFormValues({ ...formValues, slogan: e.target.value })
            }
          />
          {formValues.members.map((member, index) => (
            <div className="flex" key={index}>
              <Input
                type="text"
                placeholder="name"
                value={member.name}
                onChange={(e) =>
                  handleMemberInputChange(index, "name", e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="number"
                value={member.numero}
                onChange={(e) =>
                  handleMemberInputChange(index, "number", e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="position"
                value={member.position}
                onChange={(e) =>
                  handleMemberInputChange(index, "position", e.target.value)
                }
              />
              <Button type="button" onClick={() => handleRemoveMember(index)}>
                -
              </Button>
            </div>
          ))}
          <Button type="button" onClick={handleAddMember}>
            Ajouter un membre
          </Button>
          <Button
            className="w-full mt-4"
            type="submit"
            onClick={async () => {
              if (!formValues.name || !formValues.slogan)
                return alert("Veuillez remplir tous les champs");
              if (formValues.members.length === 0)
                return alert("Veuillez ajouter au moins un membre");
              id ? await updateTeam(formValues, id) : await addTeam(formValues);
            }}
          >
            {id ? "Modifier" : "Ajouter"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TeamFormDialog;
