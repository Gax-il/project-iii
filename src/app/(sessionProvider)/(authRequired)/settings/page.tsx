"use client";

import { useCurrentUser } from "@/actions/hooks/use-current-user";
import { ChangePasswordForm } from "@/components/afterAuth/change-password-form";
import { NameEmailForm } from "@/components/afterAuth/name-email-form";
import React from "react";

const SettingsPage = () => {
	const user = useCurrentUser();

	let oauth = user?.isOAuth;

	if (oauth == null) oauth = true;
	return (
		<span className="space-y-2">
			<NameEmailForm oauth={oauth} />
			{!oauth && <ChangePasswordForm />}
		</span>
	);
};

export default SettingsPage;
