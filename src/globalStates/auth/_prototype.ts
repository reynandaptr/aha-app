import { LoginProvider } from "@prisma/client";
import { ValidateUserResponse } from "@reynandaptr/aha-types/dist";

export type AuthState = {
  auth?: ValidateUserResponse | null
  loginProvider?: LoginProvider
};
