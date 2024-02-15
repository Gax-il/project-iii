import { default_perms } from "@/assets/default";
import { IPermission } from "@/schemas/role";
import { useSession } from "next-auth/react";

export const useCurrentPerms = () => {
	const session = useSession();

	const perms = session.data?.user.role.permissions as unknown as IPermission;

	if (!perms) {
		return default_perms;
	}

	return perms;
};
