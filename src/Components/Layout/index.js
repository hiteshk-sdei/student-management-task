import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.scss";

const Layout = (props) => {
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <div className="app-wrapper">
        <Header />
        <div className="app-body">{props.children}</div>
      </div>
    </div>
  );
};
export default Layout;
