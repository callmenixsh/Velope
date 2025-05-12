import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Topvelopes = () => {
	const [topNames, setTopNames] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState("right");
	const [animating, setAnimating] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTopNames = async () => {
			try {
				const res = await fetch(`${apiUrl}/top-names`);
				const data = await res.json();
				setTopNames(data.slice(0, 3));
			} catch (error) {
				console.error("Failed to fetch top names:", error);
			}
		};
		fetchTopNames();
	}, []);

	const handleSlide = (dir) => {
		if (animating) return; // prevent spam clicks
		setAnimating(true);
		setDirection(dir);
		setTimeout(() => {
			setCurrentIndex((prev) =>
				dir === "right"
					? (prev + 1) % topNames.length
					: (prev - 1 + topNames.length) % topNames.length
			);
			setAnimating(false);
		}, 400);
	};

	if (topNames.length === 0) return null;

	return (
		<div className="flex justify-center">
			<div className="flex flex-col items-center py-4 md:py-6 border-b w-[95%] xl:w-[80%] 2xl:w-[1500px]">
				<div className="font-Heading pb-2 text-base md:text-lg 2xl:text-2xl">
					Most Velopes today
				</div>

				{/* Mobile  */}
				<div className="md:hidden flex items-center justify-center relative w-[85%] py-3 overflow-hidden">
					<button
						onClick={() => handleSlide("left")}
						className="absolute left-0 px-2 py-1 text-black dark:text-white text-lg z-10"
					>
						{"<"}
					</button>

					<div
						key={currentIndex}
						className={`relative w-44 mx-auto absolute transition-all duration-300 ${
							animating
								? direction === "right"
									? "slide-exit-right"
									: "slide-exit-left"
								: direction === "right"
								? "slide-enter-left"
								: "slide-enter-right"
						}`}
						onClick={() => navigate(`/read/${topNames[currentIndex]._id}`)}
					>
						<img src="/assets/icons/lettertop.svg" className="w-full" alt="Letter Icon" />
						<p className="absolute inset-0 flex items-center justify-center text-lg text-black pointer-events-none font-Content font-Special font-bold">
							{topNames[currentIndex]._id}
						</p>
					</div>

					<button
						onClick={() => handleSlide("right")}
						className="absolute right-0 px-2 py-1 text-black dark:text-white text-lg z-10"
					>
						{">"}
					</button>
				</div>

				{/* Desktop */}
				<div className="hidden md:flex gap-4 2xl:gap-8">
					{topNames.map((item, i) => (
						<div
							key={i}
							className="relative w-fit cursor-pointer"
							onClick={() => navigate(`/read/${item._id}`)}
						>
							<img src="/assets/icons/lettertop.svg" className="w-50 2xl:w-80" alt="Letter Icon" />
							<p className="absolute inset-0 flex items-center justify-center text-xl 2xl:text-3xl text-black pointer-events-none font-Content font-Special font-bold">
								{item._id}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Topvelopes;
