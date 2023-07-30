import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

export const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:8080/users", {
    name: faker.person.fullName(),
  });

  return response.data;
});
