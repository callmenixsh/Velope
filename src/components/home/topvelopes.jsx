import React from "react";
import { useNavigate } from "react-router-dom";

const topvelopes = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="flex justify-center">
				<div className="flex flex-col justify-center items-center py-8 border-b-1  md:border-b-1 w-[95%] xl:w-[80%] 2xl:w-[1500px]">
					<div className="font-Heading pb-2 text-[.5em] md:text-base 2xl:text-2xl">Most Velopes today</div>
					<div className="flex gap-2 md:gap-4 2xl:gap-8 ">
						<div className="relative w-fit" onClick={() => navigate("/read")}>
							<img src="/assets/icons/lettertop.svg" className="w-30 md:w-50 2xl:w-80" alt="Letter Icon" />
							<p className="absolute inset-0 flex items-center justify-center text-[.7em] md:text-base 2xl:text-2xl text-black pointer-events-none">
								TheNAME
							</p>
						</div>
            <div className="relative w-fit" onClick={() => navigate("/read")}>
							<img src="/assets/icons/lettertop.svg" className="w-30 md:w-50 2xl:w-80" alt="Letter Icon" />
							<p className="absolute inset-0 flex items-center justify-center text-[.7em] md:text-base 2xl:text-2xl text-black pointer-events-none">
								TheNAME
							</p>
						</div>
            <div className="relative w-fit" onClick={() => navigate("/read")}>
							<img src="/assets/icons/lettertop.svg" className="w-30 md:w-50 2xl:w-80" alt="Letter Icon" />
							<p className="absolute inset-0 flex items-center justify-center text-[.7em] md:text-base 2xl:text-2xl text-black pointer-events-none">
								TheNAME
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default topvelopes;
