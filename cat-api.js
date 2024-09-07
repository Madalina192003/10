import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
  "live_3SE1A1fKok6xGdbI0K7J927wwuLSCsG88anQJOd3WNDycKLQaxfkKinHn6RJ7r4R";

export const fetchBreeds = async () => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching breeds");
  }
};

export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    throw new Error("Error fetching cat by breed");
  }
};
