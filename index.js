const fetchBreeds = async () => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching breeds");
  }
};

const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    throw new Error("Error fetching cat by breed");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const breedSelect = document.getElementById("breed-select");
  const loader = document.querySelector(".loader");
  const error = document.querySelector(".error");
  const catInfo = document.querySelector(".cat-info");

  const updateLoader = (show) => {
    loader.style.display = show ? "block" : "none";
  };

  const showError = (show) => {
    error.style.display = show ? "block" : "none";
  };

  const updateCatInfo = (cat) => {
    if (cat) {
      catInfo.innerHTML = `
                <h2>${cat.breeds[0].name}</h2>
                <p>${cat.breeds[0].description}</p>
                <p>Temperament: ${cat.breeds[0].temperament}</p>
                <img src="${cat.url}" alt="${cat.breeds[0].name}" width="300">
            `;
    }
  };

  const loadBreeds = async () => {
    updateLoader(true);
    try {
      const breeds = await fetchBreeds();
      breedSelect.innerHTML = breeds
        .map((breed) => `<option value="${breed.id}">${breed.name}</option>`)
        .join("");
      new SlimSelect({ select: "#breed-select" });
    } catch (err) {
      showError(true);
    } finally {
      updateLoader(false);
    }
  };

  breedSelect.addEventListener("change", async (event) => {
    const breedId = event.target.value;
    if (breedId) {
      updateLoader(true);
      try {
        const cat = await fetchCatByBreed(breedId);
        updateCatInfo(cat);
      } catch (err) {
        showError(true);
      } finally {
        updateLoader(false);
      }
    }
  });

  loadBreeds();
});
