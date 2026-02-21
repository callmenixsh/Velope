import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const Rnw = () => {
	const [name, setName] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [suggestionSelected, setSuggestionSelected] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const MAX_NAME_LENGTH = 20;
	const RESTRICTED_NAME = "Logs";

	const isValidName = (value) => /^[a-zA-Z\s]+$/.test(value.trim());

	const handleNavigate = (path) => {
		if (name.trim().toLowerCase() === RESTRICTED_NAME.toLowerCase() && path === "/write") {
			setError("You can only read the Logs.");
			return;
		}

		if (isValidName(name) && name.trim().length <= MAX_NAME_LENGTH) {
			setError("");
			navigate(`${path}/${encodeURIComponent(name.trim())}`);
		} else {
			setError("Please enter a name to read/write a velope.");
		}
	};

	useEffect(() => {
		const fetchSuggestions = async () => {
			if (name.trim().length === 0 || suggestionSelected) {
				setSuggestions([]);
				return;
			}
			try {
				const res = await fetch(`${apiUrl}/suggest-names?q=${name}`);
				const data = await res.json();
				setSuggestions(data);
				setShowSuggestions(true);
			} catch (err) {
				console.error("Suggestion error:", err);
			}
		};

		const delayDebounce = setTimeout(() => {
			fetchSuggestions();
		}, 300);

		return () => clearTimeout(delayDebounce);
	}, [name, suggestionSelected]);

	const handleSuggestionClick = (suggestedName) => {
		setName(suggestedName);
		setSuggestions([]);
		setShowSuggestions(false);
		setSuggestionSelected(true);
		setError("");
	};

	const handleInputChange = (e) => {
		if (e.target.value.length <= MAX_NAME_LENGTH) {
			setName(e.target.value);
		}
		setSuggestionSelected(false);
		setError("");
	};

	return (
		<div className="flex justify-center select-none">
			<div className="flex flex-col items-center w-[95%] xl:w-[80%] 2xl:w-[1500px] py-4 md:py-6 gap-2">
				<div className="flex justify-center mb-2 gap-6 md:gap-10">
					<button
						type="button"
						className="group flex items-center type-heading transition-all duration-150 cursor-pointer px-4 py-2 md:px-6 md:py-3 text-black"
						onClick={() => handleNavigate("/read")}
						style={{
							backgroundImage: "url(/assets/strip.png)",
							backgroundSize: "100% 100%",
							backgroundRepeat: "no-repeat",
						}}
						onMouseEnter={e => e.currentTarget.style.transform = 'rotate(-3deg)'}
						onMouseLeave={e => e.currentTarget.style.transform = 'none'}
					>
						   <img
							   src="/assets/icons/glasses.svg"
							   alt="Read icon"
							   className="size-6 md:size-8 xl:size-10 p-0.5 md:p-1 xl:p-2"
							   style={{ filter: 'invert(0)', color: 'black' }}
						   />
						<span className="ml-1 font-semibold text-black">READ</span>
					</button>
					<button
						type="button"
						className="group flex items-center type-heading transition-all duration-150 cursor-pointer px-4 py-2 md:px-6 md:py-3 text-black"
						onClick={() => handleNavigate("/write")}
						style={{
							backgroundImage: "url(/assets/strip.png)",
							backgroundSize: "100% 100%",
							backgroundRepeat: "no-repeat",
						}}
						onMouseEnter={e => e.currentTarget.style.transform = 'rotate(3deg)'}
						onMouseLeave={e => e.currentTarget.style.transform = 'none'}
					>
						   <img
							   src="/assets/icons/pen.svg"
							   alt="Write icon"
							   className="size-6 md:size-8 xl:size-10 p-0.5 md:p-1 xl:p-2"
							   style={{ filter: 'invert(0)', color: 'black' }}
						   />
						<span className="ml-1 font-semibold text-black">WRITE</span>
					</button>
				</div>
				<div className="relative w-full max-w-xs md:max-w-sm">
					<input
						className="font-Content w-full border-0 border-b-2 border-gray-400 dark:border-white/70 dark:focus:border-white focus:border-black outline-none px-2 py-1 placeholder-black/50 dark:placeholder-white/50 text-center type-heading bg-transparent transition-all duration-300"
						placeholder="Name"
						value={name}
						onChange={handleInputChange}
						onFocus={() => setShowSuggestions(true)}
						onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
					/>
					{showSuggestions && suggestions.length > 0 && (
						<ul className="absolute top-full mt-1 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md shadow w-full z-10 type-body text-center overflow-hidden">
							{suggestions.map((s, idx) => (
								<li
									key={idx}
									className="cursor-pointer px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-150"
									onClick={() => handleSuggestionClick(s)}
								>
									{s}
								</li>
							))}
						</ul>
					)}
				</div>
				{error && (
					<div className="text-red-500 dark:text-red-400 text-xs mt-1 text-center max-w-xs">{error}</div>
				)}
			</div>
		</div>
	);
};

export default Rnw;
