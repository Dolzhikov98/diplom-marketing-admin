import { Navigate, Outlet } from "react-router-dom";

import Layout from "./components//presentational/Layout/Layout";

const PrivateRoute = () => {
  // const token = localStorage.getItem("token");
  // if (!token) return <Navigate to={"/login"} />;
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default PrivateRoute;
