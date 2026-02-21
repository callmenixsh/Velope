import React from "react";

const Loading = () => (
	<div className="flex items-center justify-center py-12 bg-transparent">
		<div className="relative flex flex-col items-center">
			<svg
				className="w-12 h-8 md:w-16 md:h-10 animate-bounce-slow drop-shadow-lg"
				viewBox="0 0 208 120"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="0.5" y="0.5" width="207" height="119" rx="8" fill="#fffbe9" stroke="#e2c275" strokeWidth="2" />
				<path d="M1.9 2L104 60L206 2" stroke="#e2c275" strokeWidth="2" />
				<path d="M104 60L104 118" stroke="#e2c275" strokeWidth="2" />
				<ellipse cx="104" cy="60" rx="12" ry="8" fill="#ffe6a7" />
			</svg>
			<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/10 rounded-full blur-sm animate-pulse" />
			<span className="mt-4 text-xs md:text-sm text-yellow-900 dark:text-yellow-200 font-medium tracking-wide animate-fadeIn">
				Delivering your velopes…
			</span>
		</div>
		<style>{`
			@keyframes bounce-slow {
				0%, 100% { transform: translateY(0); }
				50% { transform: translateY(-12px); }
			}
			.animate-bounce-slow {
				animation: bounce-slow 1.6s infinite cubic-bezier(.68,-0.55,.27,1.55);
			}
			@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
			.animate-fadeIn { animation: fadeIn 1s ease 0.5s both; }
		`}</style>
	</div>
);

export default Loading;
