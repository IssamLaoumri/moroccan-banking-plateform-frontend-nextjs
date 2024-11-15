"use client";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = ({ user }: MobileNavProps) => {
	const pathname = usePathname();

	return (
		<section className="w-full mex-w-[264px]">
			<Sheet>
				<SheetTrigger>
					<Image src="/icons/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
				</SheetTrigger>
				<SheetContent side="left" className="border-none bg-white">
					<SheetTitle className="hidden">Menu</SheetTitle>
					<SheetDescription className="hidden">Navbar</SheetDescription>
					<Link href="/" className="flex mb-12 cursor-pointer items-center gap-1 px-4">
						<Image alt="Sahra logo" src="/icons/logo.svg" width={34} height={34} />
						<h2 className="text-26 font-ibm-plex-serif font-bold text-black-1">Sahra</h2>
					</Link>
					<div className="mobilenav-sheet">
						<SheetClose asChild>
							<nav className="flex h-full flex-col gap-6 pt-16 text-white">
								{sidebarLinks.map((item) => {
									const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
									return (
										<SheetClose asChild key={item.label}>
											<Link
												href={item.route}
												className={cn("mobilenav-sheet_close w-full", { "bg-bank-gradient": isActive })}
											>
												<Image
													src={item.imgURL}
													alt={item.label}
													width={20}
													height={20}
													className={cn({ "brightness-[3] invert-0": isActive })}
												/>
												<p className={cn("text-16 font-semibold text-black-2", { "text-white": isActive })}>
													{item.label}
												</p>
											</Link>
										</SheetClose>
									);
								})}
							</nav>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
};

export default MobileNav;
