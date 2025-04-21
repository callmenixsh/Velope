import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const Rnw = () => {
	const [name, setName] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [suggestionSelected, setSuggestionSelected] = useState(false);
	const navigate = useNavigate();

	const isValidName = (value) => /^[a-zA-Z\s]+$/.test(value.trim());

	const handleNavigate = (path) => {
		if (isValidName(name)) {
			navigate(`${path}/${encodeURIComponent(name.trim())}`);
		} else {
			alert("Please enter a valid name");
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
	};

	const handleInputChange = (e) => {
		setName(e.target.value);
		setSuggestionSelected(false); 
	};

	return (
		<div className="flex justify-center select-none">
			<div className="flex justify-center pb-4 md:pt-3 2xl:pt-6 border-b-1 md:border-b-1 w-[95%] xl:w-[80%] 2xl:w-[1500px]">
				<div className="font-Heading">
					<div className="relative">
						<input
							className="font-Content w-full border-b-1 md:border-b-2 border-gray-400 dark:border-white/70 dark:focus:border-white focus:border-black outline-none px-2 placeholder-black/50 dark:placeholder-white/50 text-center text-[.5em] md:text-base 2xl:text-2xl transition-all duration-300"
							placeholder="Name"
							value={name}
							onChange={handleInputChange}
							onFocus={() => setShowSuggestions(true)}
							onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
						/>
						{showSuggestions && suggestions.length > 0 && (
							<ul className="absolute bg-white dark:bg-black border-[0.5px] md:border-1 rounded-md shadow w-full z-10 text-[5px] md:text-xs 2xl:text-sm text-center">
								{suggestions.map((s, idx) => (
									<li
										key={idx}
										className="cursor-pointer px-2 py-1 hover:bg-gray-100 dark:hover:bg-white/10"
										onClick={() => handleSuggestionClick(s)}
									>
										{s}
									</li>
								))}
							</ul>
						)}
					</div>

					<div className="flex justify-around mt-2">
						<div
							className="group flex items-center text-[.5em] md:text-base 2xl:text-2xl transition-all duration-300 hover:scale-103"
							onClick={() => handleNavigate("/read")}
						>
							<img
								src="/assets/icons/glasses.svg"
								alt="Light icon"
								className="dark:invert size-4 md:size-8 xl:size-10 p-0.5 md:p-1 xl:p-2 transition-all duration-300 group-hover:-rotate-10"
							/>
							READ
						</div>
						<div
							className="group flex items-center text-[.5em] md:text-base 2xl:text-2xl transition-all duration-300 hover:scale-103"
							onClick={() => handleNavigate("/write")}
						>
							<img
								src="/assets/icons/pen.svg"
								alt="Light icon"
								className="dark:invert size-4 md:size-8 xl:size-10 p-0.5 md:p-1 xl:p-2 transition-all duration-300 group-hover:-rotate-10"
							/>
							WRITE
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Rnw;
