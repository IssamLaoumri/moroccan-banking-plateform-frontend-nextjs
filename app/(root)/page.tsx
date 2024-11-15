import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";

const Home = () => {
	const loggedIn = { firstName: "Issam", lastName: "Laoumri", email: "issamlaoumri@gmail.com" };
	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedIn?.firstName || "guest"}
						subtext="Access and manage your accounts and transactions efficiently."
					/>
					<TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.95} />
				</header>
			</div>
			<RightSidebar
				user={loggedIn}
				transactions={[]}
				banks={[{ currentBalance: 2250.88 }, { currentBalance: 120.88 }]}
			/>
		</section>
	);
};

export default Home;
