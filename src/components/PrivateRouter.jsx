import {useLocation, Navigate, Outlet} from "react-router-dom";

export default function PrivateRouter() {
  const user = localStorage.getItem('user');
  const location = useLocation();

  if (user === undefined) return null;

  return user
    ? <Outlet />
    : <Navigate to="/booking" replace state={{ from: location }} />;
}