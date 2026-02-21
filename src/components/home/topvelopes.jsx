import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Topvelopes = () => {
	const [topNames, setTopNames] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState("right");
	const [animating, setAnimating] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTopNames = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(`${apiUrl}/top-names`);
				const data = await res.json();
				setTopNames(data.slice(0, 3));
			} catch (error) {
				console.error("Failed to fetch top names:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchTopNames();
	}, []);

	const handleSlide = (dir) => {
		if (animating) return; 
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

	if (isLoading) return null;
	if (topNames.length === 0) return null;

	return (
		<div className="flex justify-center">
			<div className="flex flex-col items-center py-6 md:py-8 border-b w-[95%] xl:w-[80%] 2xl:w-[1500px] relative z-10">
				<div className="font-Heading pb-3 md:pb-4 type-heading font-semibold">
					Most Velopes Today
				</div>

				{/* Mobile  */}
				<div className="md:hidden flex items-center justify-center relative w-full py-4 overflow-hidden">
					<button
						onClick={() => handleSlide("left")}
						className="absolute left-2 px-3 py-2 text-black dark:text-white type-title z-10 rounded-[5px] hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-150 active:scale-95"
						aria-label="Previous"
					>
						←
					</button>

					<div className="relative w-56 mx-auto">
						<div
							key={currentIndex}
							className={`relative transition-all duration-300 ${
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
						<div 
							className="relative cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] overflow-visible rounded-[5px] w-60 md:w-80"
							style={{
								backgroundImage: 'url(/assets/envelope.png)',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center',
								minHeight: '220px',
							}}
						>
							<div className="flex flex-col items-center justify-between h-full pt-13 pb-5" style={{position: 'relative', zIndex: 1, minHeight: '220px'}}>
								<p className="type-title text-black font-Content font-Special font-bold">{topNames[currentIndex]._id}</p>
								<div className="flex-grow" />
								<p className="text-xs text-black/70 font-semibold mb-10">{topNames[currentIndex].count} velopes</p>
							</div>
							</div>
						</div>
					</div>

					<button
						onClick={() => handleSlide("right")}
						className="absolute right-2 px-3 py-2 text-black dark:text-white type-title z-10 rounded-[5px]hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-150 active:scale-95"
						aria-label="Next"
					>
						→
					</button>
				</div>

				{/* Desktop */}
				<div className="hidden md:flex gap-6 2xl:gap-10">
					{topNames.map((item, i) => (
						<div
							key={i}
							className="relative cursor-pointer transition-transform duration-200 hover:scale-[1.05] hover:-translate-y-1 active:scale-[0.98] overflow-visible rounded-[5px] w-60 md:w-60 lg:w-80"
							style={{
								backgroundImage: 'url(/assets/envelope.png)',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center',
								minHeight: '220px',
							}}
							onClick={() => navigate(`/read/${item._id}`)}
						>
							<div className="flex flex-col items-center justify-between h-full pt-13 lg:pt-8 pb-13 lg:pb-8" style={{position: 'relative', zIndex: 1, minHeight: '220px'}}>
								<p className="type-title 2xl:type-heading text-black font-Content font-Special font-bold">{item._id}</p>
								<div className="flex-grow" />
								<p className="text-xs 2xl:type-meta text-black/70 font-semibold mb-2">{item.count} velopes</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Topvelopes;
