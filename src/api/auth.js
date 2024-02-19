import axios from "axios";

axios.defaults.baseURL = "www.dsns.sesu.ua";
export const fetchAuth = async (data) => {
  const { email, password } = data;

  try {
    const response = await axios.post(`/login`, { email, password });

    if (response.status === 200) {
      // Локал сторадж, або якась інша обробка
      return response.data;
    } else {
      // Make error
    }
  } catch (error) {
    // Make error
  }
};
