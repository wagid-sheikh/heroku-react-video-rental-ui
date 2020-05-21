import http from "./httpService";
import auth from "./authService";

const apiEndPoint = "/users/";

export function register(user) {
  return http.post(apiEndPoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

export function updateProfile(user) {
  const userObject = auth.getCurrentUser();
  const response = http.put(
    apiEndPoint + "updateProfile/" + userObject._id,
    user
  );
  return response;
}

export default {
  register,
  updateProfile,
};
