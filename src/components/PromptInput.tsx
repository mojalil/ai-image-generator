"use client";

import { useState } from "react";
import fetchSuggestionFromChatGPT from "../../lib/fetchSuggestionFromChatGPT";
import useSWR from "swr";

type PromptInputProps = {
  prompt: string;
  onSubmit: (value: string) => void;
};

const PromptInput = ({ prompt, onSubmit }: PromptInputProps) => {
  const [input, setInput] = useState(prompt);

  const {
    data: suggestion,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  console.log(suggestion)

  const loading = isLoading || isValidating;
  const loadingText = "Thinking of a suggestion ..."

  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-slate-400/10 border rounded-md lg:divide-x">
        <textarea
          placeholder={
            (loading && loadingText) ||
            suggestion || "Start typing..."}
          className="flex-1 p-4 outline-none rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={`p-4 ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : " text-gray-300 cursor-not-allowed"
          } `}
          type="submit"
          disabled={!input}
        >
          Generate
        </button>
        <button
          className="p-4 bg-violet-400 text-white transition-colors duration-20 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
        >
          Use Suggestion
        </button>
        <button
          className="p-4 bg-white text-violet-400 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold"
          type="button"
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
};

export default PromptInput;
