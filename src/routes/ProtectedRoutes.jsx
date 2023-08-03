import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  return JSON.parse(localStorage.getItem("user")) ? (
    <main>
      <Outlet />
    </main>
  ) : (
    <Navigate to={"/"} />
  );
}

export default ProtectedRoutes;