import { ArrowCircleUpIcon } from "@heroicons/react/solid";
import { TextareaAutosize } from "@mui/material";
import { useState } from "react";

function AiChat() {
  const [inputValue, setInputValue] = useState("");
  const [textCount, setTextCount] = useState(0);

  const queries = [
    "What are your skills?",
    "Where are you currently working in and what is your experience?",
    "What certifications do you have?"
  ]

  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-eee to-neutral-200 flex flex-col justify-center">

      <div className="w-[80%] max-w-2xl mx-auto">

        <h1 className="z-10 text-white bg-clip-text font-normal text-5xl leading-tight">Hey there...
        </h1><br />
        <h1 className="z-10 text-white inline-block bg-clip-text font-normal text-4xl -mt-2 mb-2 leading-tight">Have anything to query about me?</h1>

        <p className="text-neutral-500 leading-tight tracking-tight mb-6 text-lg">You can talk to me by texting here<br />You will get the response from a friendly AI assistant.</p>

        <div className="flex w-full mb-6 gap-3 text-sm text-neutral-800">

        {
          queries.map((query, index) => (
            <div key={index} className="text-white cursor-pointer group relative grow border border-ccc shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:bg-neutral-100/30 rounded-xl p-4 transition-all duration-300" onClick={() => {setInputValue(query); setTextCount(query.length)}} >
              {query}
              <svg className="absolute right-2 bottom-2 h-4 text-neutral-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none"><path d="M2 8a.75.75 0 0 1 .75-.75h8.787L8.25 4.309a.75.75 0 0 1 1-1.118L14 7.441a.75.75 0 0 1 0 1.118l-4.75 4.25a.75.75 0 1 1-1-1.118l3.287-2.941H2.75A.75.75 0 0 1 2 8z" fill="currentColor"></path></g></svg>
            </div>
          ))
        }
        </div>

        <div className="bg-white h-28 rounded-2xl shadow-md h-auto border border-neutral-200 relative">

          <div className="flex">
            <TextareaAutosize minRows={3} value={inputValue} onChange={(e) => {setInputValue(e.target.value); setTextCount(e.target.value.length)}} className="grow m-4 outline outline-0 focus:outline-0 active:border-transparent min-h-16" placeholder="Type your question here ..." />
          </div>

          <div className="flex gap-2 items-center absolute right-2 bottom-2">
            <div className="text-xs">{textCount}/4000</div>
            <ArrowCircleUpIcon className="h-10 w-10 text-black cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiChat