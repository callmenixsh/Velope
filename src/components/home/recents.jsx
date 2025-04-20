import React from "react";
import Postsumm from "./postsumm";

const Recents = () => {
	return (
		<div className="flex items-center flex-col min-h-screen">
			<div className="font-Heading py-8 text-[.5em] md:text-base 2xl:text-2xl">
				Recent Velopes
			</div>
			<div className="flex items-start justify-center mx-10 w-[95%] xl:w-[80%] 2xl:w-[1500px] flex-grow">
				<div className="grid grid-cols-4 gap-x-4 md:gap-x-8 2xl:gap-x-10">
					<Postsumm />
					<Postsumm />
					<Postsumm />
					<Postsumm />
					<Postsumm />
					<Postsumm />
					<Postsumm />
					<Postsumm />
					<Postsumm />
					<Postsumm />
					<Postsumm />
				</div>
			</div>
		</div>
	);
};

export default Recents;
