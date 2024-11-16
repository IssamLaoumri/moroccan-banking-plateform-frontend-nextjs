"use server";

import { parseStringify } from "../utils";

export const signUp = async ({ password, ...userData }: SignUpParams) => {
	return parseStringify(userData);
};

export const signIn = async ({ email, password }: signInProps) => {
	return { email, password };
};

export const getLoggedInUser = async () => {};

export const logout = async () => {
	return true;
};
