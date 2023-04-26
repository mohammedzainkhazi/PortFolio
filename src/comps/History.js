import React from "react";
import Card from "./Card";

export default function History() {
    return (
        <div className="py-8 !bg-gray-900">
            <div className="text-left px-5 lg:px-10 text-white">    
                <h3 className="font-bold text-2xl">Search History</h3>
            </div>
            <div className="my-6 px-5 lg:px-10 w-full"> 
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((card, i) => (
                    <Card key={i} index={i}/>
                ))}
            </div>
        </div>
    )
}