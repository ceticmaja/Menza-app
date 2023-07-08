import { Box, Button, IconButton } from "@mui/material";
import { PageDetails } from "./navBar";
import LogoutIcon from "@mui/icons-material/Logout";

interface PagesProps {
  pages: PageDetails[];
}

const NavBarItems = ({ pages }: PagesProps) => {
  const handleLogOut = () => {
    localStorage.setItem("token", " ");
    localStorage.setItem("userId", " ");
    localStorage.setItem("role", " ");
    localStorage.setItem("userFullName", " ");
    window.location.href = "http://localhost:3000/home";
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
        }}
      >
        {pages.map((page) => (
          <Button
            key={page.key}
            href={page.href}
            sx={{
              my: 2,
              color: "white",
              display: "block",
            }}
          >
            {page.displayName}
          </Button>
        ))}
      </Box>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={() => handleLogOut()}
      >
        <LogoutIcon />
      </IconButton>
    </>
  );
};

export default NavBarItems;
