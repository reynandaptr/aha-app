const API_URL = 'https://aha-api.reynandaptr.dev';

export const getApiURL = () => {
  return process.env.NODE_ENV === 'development' ? `http://localhost:8080/${API_URL}` : API_URL;
}

// export const getApiURL = () => {
//   return "http://localhost:4000";
// }
