import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export const fetchAllTranscriptions = async () => {
  try {
    const response = await axios.get("/transcriptions/");
    return response.data;
  } catch (error) {
    console.log("Error in fetchAlltranscriptions, data: ", error);
    return error;
  }
};

export const fetchTranscriptionById = async (id) => {
  try {
    const response = await axios.get(`/transcriptions/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error in fetchAlltranscriptions, data: ", error);
    return error;
  }
};

export const postOneTranscriptions = async (file) => {
  let formData = new FormData();

  formData.append("files", file);
  formData.append("out_format", "text");

  try {
    const response = await axios.post("/transcribe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("postOneTranscriptions, data: ", error);
    return error;
  }
};

export const deleteTranscriptionById = async (id) => {
  try {
    const response = await axios.delete(`/transcriptions/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("deleteTranscriptionById, data: ", error);
    return error;
  }
};
