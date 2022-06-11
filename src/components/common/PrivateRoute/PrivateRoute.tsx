import { Navigate, Outlet } from "react-router-dom";

import Layout from "../../presentational/Layout/Layout";

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
