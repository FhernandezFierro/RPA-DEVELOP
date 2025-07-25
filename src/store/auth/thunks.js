import { login, logout } from "./";
import { rpaApi } from "../../api/rpaApi";

export const startLogin = ({ rut, contrasena }) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("rut", rut);
    f.append("contrasena", contrasena);
    try {
      const result = await rpaApi.post(`login`, f, {
        "Content-Type": "application/json",
      });
      window.localStorage.setItem("rpa-jwt", result.data.token);
      dispatch(login(result.data));
    } catch (error) {
      dispatch(logout(error.response.data.message));
    }
  };
};


