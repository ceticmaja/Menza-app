import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { useEffect, useState } from "react";
import NavBarItems from "./navBarItems";

export interface PageDetails {
  displayName: string;
  key: string;
  href: string;
}

function AppNavBar() {
  const role = localStorage.getItem("role") ?? (" " as string);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pages, setPages] = useState<PageDetails[]>([]);

  const pagesAdmin: PageDetails[] = [
    {
      displayName: "Users",
      key: "users",
      href: "/admin/users",
    },
    {
      displayName: "Roles",
      key: "roles",
      href: "/admin/roles",
    },
    {
      displayName: "Purchase Items",
      key: "purchaseItems",
      href: "/admin/purchaseItems",
    },
    {
      displayName: "Purchase Histories",
      key: "purchaseHistories",
      href: "/admin/purchaseHistories",
    },
    {
      displayName: "Menus",
      key: "menus",
      href: "/admin/menus",
    },
    {
      displayName: "Meal Types",
      key: "mealTypes",
      href: "/admin/mealTypes",
    },
    {
      displayName: "Faculties",
      key: "faculties",
      href: "/admin/faculties",
    },
    {
      displayName: "Countries",
      key: "countries",
      href: "/admin/countries",
    },
  ];

  const pagesStudent: PageDetails[] = [
    {
      displayName: "Menus",
      key: "menusStudent",
      href: "/student/menus",
    },
    {
      displayName: "mealTypes",
      key: "mealTypesStudent",
      href: "/student/mealTypes",
    },
    {
      displayName: "Purchase Histories",
      key: "purchaseHistories",
      href: "/student/purchaseHistories",
    },
  ];

  useEffect(() => {
    if (role !== " ") {
      setIsLoggedIn(true);
      switch (role) {
        case "Admin":
          setPages(pagesAdmin);
          break;
        case "Student":
          setPages(pagesStudent);
          break;
        default:
          break;
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Diversity2Icon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MENZA
          </Typography>
          {isLoggedIn ? <NavBarItems pages={pages} /> : <></>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppNavBar;
