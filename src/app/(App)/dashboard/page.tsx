import { api } from "~/trpc/server";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
  const boards = await api.board.getAll();

  return (
    <DashboardClient boards={boards}/>
  );
}
