"use client";

import { useCurrentUser } from "@/actions/hooks/use-current-user";
import { Navbar } from "@/components/afterAuth/navbar";
import { IconLoader } from "@tabler/icons-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const user = useCurrentUser();
	if (!user) {
		return (
			<div className="w-screen flex justify-center">
				<span className="w-[350px] max-w-[90%] lg:w-[1000px]">
					<Navbar className="my-2 shadow-xl" />
					<div className="bg-white shadow-xl w-full rounded-xl p-4 flex text-center justify-center items-center">
						<IconLoader className="w-52 h-52 animate-spin" />
					</div>
				</span>
			</div>
		);
	}
	return (
		<div className="w-screen flex justify-center text-sm text-[0.5rem] lg:text-sm">
			<span className="w-[350px] max-w-[90%] lg:w-[1000px]">
				<Navbar className="my-2 shadow-xl" />
				<div className="bg-white shadow-xl w-full rounded-xl p-4">
					{children}
				</div>
			</span>
		</div>
	);
};

export default AuthLayout;
