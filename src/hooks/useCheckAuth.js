// import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const jwt_token = window.localStorage.getItem("rpa-jwt");

  const onAuthStateChange = async () => {
    if (jwt_token) {
      const result = await axios.get(`http://10.13.18.84:5000/userState`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt_token}`,
        },
      });
      {
        result.data.message === "ok"
          ? dispatch(login({ ...result.data }))
          : dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  };

  useEffect(() => {
    onAuthStateChange();
  }, []);

  return {
    status,
  };
};
