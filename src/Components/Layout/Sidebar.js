import React, { useRef } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../Assets/images/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="app-sidebar">
      <div className="logo-wrapper">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
      >
        <ListItemButton
          name="home"
          selected={pathname === "/"}
          onClick={() => navigate("/")}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          name="studentForm"
          selected={pathname === "/students/form"}
          onClick={() => navigate("/students/form")}
        >
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Add New Students" />
        </ListItemButton>
        <ListItemButton
          name="students"
          selected={pathname === "/students"}
          onClick={() => navigate("/students")}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Students List" />
        </ListItemButton>
        <ListItemButton
          name="courseForm"
          selected={pathname === "/courses/form"}
          onClick={() => navigate("/courses/form")}
        >
          <ListItemIcon>
            <BookmarkAddIcon />
          </ListItemIcon>
          <ListItemText primary="Add New Courses" />
        </ListItemButton>
        <ListItemButton
          name="courses"
          selected={pathname === "/courses"}
          onClick={() => navigate("/courses")}
        >
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Courses List" />
        </ListItemButton>
        <ListItemButton
          name="resultForm"
          selected={pathname === "/results/form"}
          onClick={() => navigate("/results/form")}
        >
          <ListItemIcon>
            <DashboardCustomizeIcon />
          </ListItemIcon>
          <ListItemText primary="Add New Results" />
        </ListItemButton>
        <ListItemButton
          name="results"
          selected={pathname === "/results"}
          onClick={() => navigate("/results")}
        >
          <ListItemIcon>
            <ChromeReaderModeIcon />
          </ListItemIcon>
          <ListItemText primary="Results List" />
        </ListItemButton>
      </List>
    </div>
  );
};
export default Header;
