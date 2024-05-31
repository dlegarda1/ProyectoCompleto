import React,{useState} from "react";

export function Switch() {
    const [isActive, setIsActive] = useState(false);

    return (
        <button
            onClick={() => setIsActive((a) => !a)}
            className={`relative h-7 w-12 cursor-pointer rounded-full bg-gray-200 px-1 hover:bg-sky-700`}
        >
            <div
                className={`absolute top-[50%] h-5 w-5 translate-y-[-50%] rounded-full bg-gray-500 transition-all ${isActive ?"left-6 scale-95 bg-orange-500":"left-1"}`}

            />
        </button>
    );
}