import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../auth/pages/Login";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { RpaRoutes } from "../rpa/router/RpaRoutes";
export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<RpaRoutes />} />
      ) : (
        <Route path="/auth/*" element={<Login />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
