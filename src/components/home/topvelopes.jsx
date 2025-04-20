import React from "react";
import Topnames from "./topnames";

const topvelopes = () => {
	return (
		<>
			<div className="flex justify-center">
				<div className="flex flex-col justify-center items-center py-8 border-b-1  md:border-b-1 w-[95%] xl:w-[80%] 2xl:w-[1500px]">
					<div className="font-Heading pb-2 text-[.5em] md:text-base 2xl:text-2xl">
						Most Velopes today
					</div>
					<div className="flex gap-2 md:gap-4 2xl:gap-8 ">
					<Topnames/>
					<Topnames/>
					<Topnames/>
					</div>
				</div>
			</div>
		</>
	);
};

export default topvelopes;
