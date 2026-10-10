import { auth } from "@/library/auth/server";

export const { GET, POST, PUT, DELETE, PATCH } = auth.handler();
