import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { GetAllMenus } from "../menus/menuSlice";
import background from "../img/background.jpeg";
import { Typography } from "@mui/material";

export default function MenuStudentPage() {
  const appDispatch = useAppDispatch();
  const { allMenus } = useAppSelector((state) => state.menus);

  useEffect(() => {
    appDispatch(GetAllMenus());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 400,
            height: 500,
          },
        }}
      >
        {allMenus.map((menu, index) => (
          <Paper sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h3" align="center">
              Menu {index + 1}
            </Typography>
            <Typography variant="h6" align="center">
              {menu.publishDate.toLocaleString().split("T")[0]}
            </Typography>
            <Typography variant="h4" align="center">
              {menu.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </div>
  );
}
