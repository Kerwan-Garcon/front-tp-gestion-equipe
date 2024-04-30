"use client";

import { deleteTeam } from "@/actions/teams";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function TeamsTable({ id, name, slogan }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-[100px]">Name</TableHead>
          <TableHead className="w-[100px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{name}</TableCell>
          <TableCell className="font-medium">
            <Link className="mr-1" href={`/team/${id}`}>
              Go!
            </Link>
            <span
              onClick={() => deleteTeam(id)}
              className="ml-1 bg-white cursor-pointer"
            >
              ❌
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
