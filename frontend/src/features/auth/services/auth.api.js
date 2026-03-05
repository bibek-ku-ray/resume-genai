import apiService from "../../../utils/apiService";

export async function register({ username, email, password }) {
  try {
    const response = await apiService.post("/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function login({ email, password }) {
  try {
    const response = await apiService.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    const response = await apiService.post("/auth/logout");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMe() {
  try {
    const response = await apiService.get("/auth/me");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
