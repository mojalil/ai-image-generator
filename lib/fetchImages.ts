const fetchImages = async (text: string) =>
  fetch("/api/getImages", {
    cache: "no-cache",
  }).then((response) => {
    return response.json();
  });

export default fetchImages;
