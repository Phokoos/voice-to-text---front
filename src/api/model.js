import axios from "axios";
import dataForTestRisk from "../dataForTestRisk";

axios.defaults.baseURL = "http://localhost:8000";

export const fetchAllTranscriptions = async () => {
  try {
    const response = await axios.get("/transcriptions/?skip=0&limit=100");
    return response.data;
  } catch (error) {
    console.log("Error in fetchAlltranscriptions, data: ", error);
    return error;
  }
};

export const fetchAllModels = async () => {
  try {
    const response = await axios.get("/models/");
    return response.data;
  } catch (error) {
    console.log("Error in fetchAllModels, data: ", error);
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

export const fetchLLMDetailsByFileId = async (id) => {
  try {
    // const response = await axios.get(
    //   `/onlineGen?transcription_id=${id}&prompt=summarize%3A%20&type=text&role=user`,
    // );
    // return response.data;
    return dataForTestRisk;
  } catch (error) {
    console.log("Error in fetchLLMDetailsByFileId, data: ", error);
    return error;
  }
};

export const postOneTranscriptions = async (file, modelId) => {
  let formData = new FormData();

  formData.append("files", file);
  formData.append("out_format", "text");

  try {
    const response = await axios.post(`/transcribe/${modelId}`, formData, {
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
