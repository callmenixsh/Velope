import React, { useState } from "react";

const ToggleTheme = () => {
	const [dark, setDark] = useState(() =>
		document.documentElement.classList.contains("dark")
	);
	const [isPulled, setIsPulled] = useState(false);

	const getStripPosition = () => {
		//  up in dakr mode, lower in light mod
		if (dark && !isPulled) return '-5.5rem'; 
		if (!dark && !isPulled) return '-2.5rem'; 
		if (isPulled && dark) return '-2.5rem'; 
		if (isPulled && !dark) return '-5.5rem'; 
		return '-5.5rem';
	};

	const handleToggle = () => {
		setIsPulled(true);
		setTimeout(() => {
			setIsPulled(false);
			document.documentElement.classList.toggle("dark");
			setDark(!dark);
		}, 120); 
	};

	return (
		<div className="relative flex flex-col items-center justify-center select-none" style={{ height: '7rem', width: '4.5rem' }}>
			<div
				className={`transition-all duration-350 flex flex-col items-center`}
				style={{
					position: 'absolute',
					top: getStripPosition(),
					left: '50%',
					transform: 'translateX(-50%)',
					width: '4.5rem',
					height: '7rem',
					zIndex: 10,
					cursor: 'pointer',
				}}
				onClick={handleToggle}
				aria-label="Toggle light mode"
			>
				<div
					style={{
						width: '100%',
						height: '100%',
						background: 'url(/assets/lightstrip.png) center/contain no-repeat',
					}}
				/>
				<img
					src="/assets/icons/light.svg"
					alt="Light icon"
					className="w-5 h-5 mt-[-2.2rem] drop-shadow-lg"
					style={{ filter: 'brightness(0) saturate(100%)', position: 'relative', zIndex: 11 }}
				/>
			</div>
		</div>
	);
};

export default ToggleTheme;
