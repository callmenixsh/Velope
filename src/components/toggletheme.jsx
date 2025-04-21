import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
	const [dark, setDark] = useState(() =>
		document.documentElement.classList.contains("dark")
	);

	const toggleTheme = () => {
		document.documentElement.classList.toggle("dark");
		setDark(!dark);
	};

	return (
		<button
			onClick={toggleTheme}
			className="rounded-full border border-black/20 dark:border-white/30 hover:shadow-[0_0_8px_#000] dark:hover:shadow-[0_0_8px_#fff]  transition-all duration-300"
		>
			{dark ? (
				<img
					src="/assets/icons/light.svg"
					alt="Light icon"
					className="size-4 md:size-6 xl:size-8 p-0.5 md:p-1 xl:p-2 border-black/20 dark:invert transition-all duration-300 "
				/>
			) : (
				<img
					src="/assets/icons/dark.svg"
					alt="Dark icon"
					className="size-4 md:size-6 xl:size-8 p-0.5 md:p-1 xl:p-2 border-black/20 transition-all duration-300 "
				/>
			)}
		</button>
	);
};

export default ThemeToggle;
