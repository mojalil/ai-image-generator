const fetchSuggestionFromChatGPT = async (text: string) =>
  fetch("/api/suggestion", {
    cache: "no-cache",
  }).then((response) => {
    return response.json();
  });

export default fetchSuggestionFromChatGPT;
