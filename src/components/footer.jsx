import React from "react";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex justify-center items-center mt-10 md:mt-14">
			<div className="w-[95%] xl:w-[80%] 2xl:w-[1500px] border-t py-7 md:py-9">
				<div className="font-Heading type-meta text-center flex flex-col gap-1.5 leading-relaxed">
					<div>🕊️ The pigeons read your letters. Be kind with your ink.</div>
					<div>
						Sealed by {" "}
						<a
							href="https://github.com/callmenixsh"
							target="_blank"
							rel="noopener noreferrer"
							className="font-bold text-red-500 dark:text-red-300 hover:opacity-80 transition-opacity duration-200"
						>
							Callmenixsh
						</a>{" "}
						with 💗 · {currentYear}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
