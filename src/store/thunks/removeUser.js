import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeUser = createAsyncThunk("users/delete", async (user) => {
  await axios.delete(`http://localhost:8080/users/${user.id}`);
  return user;
});
