import axios from "axios";


const serverAddress = 'localhost'
const serverPort = 4000

//const API_URL = "http://localhost:8080/api/auth/";

const API_URL = `http://${serverAddress}:${serverPort}`

// export const register = (username: string, email: string, password: string) => {
//     return axios.post(API_URL + "signup", {
//       username,
//       email,
//       password,
//     });
//   };
  
  export const login = (username: string, password: string) => {
    return axios
      .post(API_URL + "verifyUser", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };
  
  export const logout = () => {
    localStorage.removeItem("user");
  };
  
  export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
  
    return null;
  };