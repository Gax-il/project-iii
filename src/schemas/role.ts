import { EXCEED_MAX_CHARS } from "@/assets/messages";
import * as z from "zod";

export interface Permission {
  [key: string]: boolean;
}

const PermissionSchema = z.record(z.boolean())

export const RoleCreateSchema = z.object({
  name: z.string().max(32, {
    message: EXCEED_MAX_CHARS(32)
  }),
  permissions: PermissionSchema,
})


export interface IPermission {
  admin: boolean,
  perm1: boolean,
  perm2: boolean,
  perm3: boolean,
}