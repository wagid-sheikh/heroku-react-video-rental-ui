import http from "./httpService";

const apiEndPoint = "/genres/";
export async function getGenres() {
  return http.get(apiEndPoint);
}
