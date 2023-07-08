import { useEffect, useState } from "react";
import background from "../img/background.jpeg";
import LoginPage from "./loginPage";
import { Grid, Typography } from "@mui/material";

export interface PageDetails {
  displayName: string;
  key: string;
  href: string;
}

function HomePage() {
  const userFullName = localStorage.getItem("userFullName") ?? (" " as string);
  const role = localStorage.getItem("role") ?? (" " as string);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (role !== " ") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          height: "88vh",
        }}
      >
        {!isLoggedIn ? (
          <LoginPage />
        ) : (
          <>
            <Grid container direction="column" alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h2" marginTop={"20vh"} color={"white"}>
                  Hello,
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h3" color={"white"}>
                  {userFullName}!
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </>
  );
}
export default HomePage;
