import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../app/hooks";
import { SignIn } from "../users/authSlice";
import { UserSignIn } from "../users/userModel";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const appDispatch = useAppDispatch();
  const [signInUser, setSignInUser] = useState<UserSignIn>({
    userName: "",
    password: "",
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    appDispatch(SignIn(signInUser));
    setTimeout(function () {
      window.location.href = "http://localhost:3000/home";
    }, 1000);
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Box
        style={{ backgroundColor: "white" }}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            autoComplete="userName"
            autoFocus
            onChange={(e) =>
              setSignInUser({ ...signInUser, [e.target.name]: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) =>
              setSignInUser({ ...signInUser, [e.target.name]: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to={"/register"}>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
