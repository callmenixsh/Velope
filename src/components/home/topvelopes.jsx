import React, { useEffect, useState } from "react";
import Topnames from "./topnames";
const apiUrl = import.meta.env.VITE_API_URL;

const Topvelopes = () => {
	const [topNames, setTopNames] = useState([]);

	useEffect(() => {
		const fetchTopNames = async () => {
			try {
				const res = await fetch(`${apiUrl}/top-names`);
				const data = await res.json();
				setTopNames(data);
			} catch (error) {
				console.error("Failed to fetch top names:", error);
			}
		};

		fetchTopNames();
	}, []);

	if (topNames.length === 0) {
		return null;
	}

	return (
		<div className="flex justify-center">
			<div className="flex flex-col justify-center items-center py-8 border-b-1 md:border-b-1 w-[95%] xl:w-[80%] 2xl:w-[1500px]">
				<div className="font-Heading pb-2 text-[.5em] md:text-base 2xl:text-2xl">
					Most Velopes today
				</div>
				<div className="flex gap-2 md:gap-4 2xl:gap-8">
					{topNames.map((item, i) => (
						<Topnames key={i} name={item._id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Topvelopes;
