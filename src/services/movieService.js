import http from "./httpService";

const apiEndPoint = "/movies/";
function movieUrl(id) {
  return `${apiEndPoint}${id}`;
}
export function getMovies() {
  return http.get(apiEndPoint);
}
export function getMovie(id) {
  return http.get(movieUrl(id));
}
export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
export function saveMovie(movie) {
  if (movie._id) {
    //we need to update the movie
    const body = { ...movie };
    delete body._id;
    //we are deleting movie._id and then sending to put service so that body does not contain _id property
    return http.put(movieUrl(movie._id), body);
  }
  // we need to create the movie
  return http.post(apiEndPoint, movie);
}
