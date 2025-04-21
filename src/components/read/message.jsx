import React from "react";
import { useNavigate } from "react-router-dom";

const Message = ({ message }) => {
    const navigate = useNavigate();

    const formattedDate = new Date(message.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="flex flex-col group select-none">
            <div
                className="relative text-black flex font-Message text-[.5em] md:text-base 2xl:text-2xl p-2 md:p-4 2xl:p-6 w-36 h-32 md:h-66 md:w-72 2xl:h-95 2xl:w-110 rounded-sm md:rounded-md 2xl:rounded-xl border-[0.5px] md:border-1 dark:border-white transition-all duration-300"
                style={{ backgroundColor: message.color }} 
                onClick={() => navigate("/post", { state: { message } })}
            >
                {message.message}
                <div className="absolute bottom-1 text-[.5em] md:text-xs 2xl:text-sm text-black ">
                    {formattedDate}
                </div>
            </div>
        </div>
    );
};

export default Message;
