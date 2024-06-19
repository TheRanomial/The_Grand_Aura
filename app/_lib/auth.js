import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function auth(req, res) {
  return await getServerSession(req, res, authOptions);
}