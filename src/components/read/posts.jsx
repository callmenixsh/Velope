import React from "react";
import { useLocation } from "react-router-dom";
import Message from "./message";

const Posts = () => {
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const theName = queryParams.get("name") || "Velope";

	return (
		<>
			<div className="flex flex-col items-center my-5 ">
				<div className="flex">
					<div className="text-base md:text-2xl 2xl:text-3xl font-Content py-4">
						Sent To: {theName}
					</div>
				</div>
				<div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-8 2xl:gap-x-10">
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
				</div>
			</div>
		</>
	);
};

export default Posts;
