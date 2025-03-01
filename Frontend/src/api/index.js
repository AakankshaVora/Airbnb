import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api/" });

export const UserSignUp = async (data) => await API.post("user/SignUp", data);

export const UserSignIn = async (data) => await API.post("user/SignIn", data);

export const getAllProperties = async (filter) => {
  const query = filter ? `?${filter}` : ""; // Construct the query string
  console.log("Query:", `/property/get-property${query}`); // Log the full API URL
  return await API.get(`/property/get-property${query}`);
};

export const getPropertyById = async (id) =>
  await API.get(`property/get-property/${id}`);

export const getFavourite = async (token) =>
  await API.get("user/get-user-fav", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addtoFavourite = async (data, token) =>
  await API.patch("user/addTofav", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const bookProperty = async (data, token) =>
    await API.post("user/booking", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    export const getBookedProperty = async (data, token) =>
      await API.get("user/get-booked-property", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
