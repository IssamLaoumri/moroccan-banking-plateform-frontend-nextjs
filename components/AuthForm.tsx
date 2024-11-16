"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: string }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const formSchema = authFormSchema(type);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			address1: "",
			city: "",
			state: "",
			postalCode: "",
			dateOfBirth: "",
			ssn: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setLoading(true);
		try {
			if (type === "sign-up") {
				const newUser = await signUp(data);
				setUser(newUser);
			}

			if (type === "sign-in") {
				const response = await signIn({ email: data.email, password: data.password });
				if (response) router.push("/");
			}
		} catch (err) {
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
				<Link href="/" className="flex mb-12 cursor-pointer items-center gap-1">
					<Image alt="Sahra logo" src="/icons/logo.svg" width={34} height={34} />
					<h2 className="text-26 font-ibm-plex-serif font-bold text-black-1">Sahra</h2>
				</Link>

				<div className="flex flex-col gap-1 md:gap-3">
					<h1 className="text-24 lg:text-36 font-semibold text-gray-900">
						{user ? "Link Account" : type === "sign-in" ? "Sign in" : "Sign up"}
					</h1>
					<p className="text-16 font-normal text-gray-600">
						{user ? "Link your account to get started" : "Please enter your details"}
					</p>
				</div>
			</header>

			{user ? (
				<div className="flex flex-col gap-4">{/* PlaidLINK */}</div>
			) : (
				<>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{type === "sign-up" && (
								<>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="firstName"
											label="First name"
											placeholder="Enter Your first name"
											type="text"
										/>
										<CustomInput
											control={form.control}
											name="lastName"
											label="Last name"
											placeholder="Enter Your last name"
											type="text"
										/>
									</div>
									<CustomInput
										control={form.control}
										name="address1"
										label="Address"
										placeholder="Enter Your specific address"
										type="text"
									/>
									<CustomInput
										control={form.control}
										name="city"
										label="City"
										placeholder="Enter Your city"
										type="text"
									/>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="state"
											label="State"
											placeholder="Example: Essaouira"
											type="text"
										/>
										<CustomInput
											control={form.control}
											name="postalCode"
											label="Postal Code"
											placeholder="Example: 44000"
											type="text"
										/>
									</div>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="dateOfBirth"
											label="Date of birth"
											placeholder="YYYY-MM-DD"
											type="text"
										/>
										<CustomInput
											control={form.control}
											name="ssn"
											label="SSN"
											placeholder="Example: 1234"
											type="text"
										/>
									</div>
								</>
							)}
							<CustomInput
								control={form.control}
								name="email"
								label="Email"
								placeholder="Enter Your email address"
								type="text"
							/>
							<CustomInput
								control={form.control}
								name="password"
								label="Password"
								placeholder="Enter Your Password"
								type="password"
							/>
							<div className="flex flex-col gap-4">
								<Button type="submit" className="form-btn" disabled={loading}>
									{loading ? (
										<>
											<Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
										</>
									) : type === "sign-in" ? (
										"Sign in"
									) : (
										"Sign up"
									)}
								</Button>
							</div>
						</form>
					</Form>

					<footer className="flex justify-center gap-1">
						<p className="text-14 font-normal text-gray-600">
							{type === "sign-in" ? "Don't have an account yet ?" : "Altready have an account ?"}
						</p>
						<Link className="form-link" href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
							{type === "sign-in" ? "Sign up" : "Sign in"}
						</Link>
					</footer>
				</>
			)}
		</section>
	);
};

export default AuthForm;
