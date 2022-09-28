import axios from "axios";

export const fetchSlots = (params = {}) => {
  const url = `/slots`;

  return axios
    .get(url, {
      params: params,
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};

export const createSlot = (params = {}) => {
  const url = `/slots`;

  return axios
    .post(url, params)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
};
