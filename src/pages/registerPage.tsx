import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { SignUp } from "../users/authSlice";
import { UserPost } from "../users/userModel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllCountries } from "../countries/countrySlice";
import { GetAllFaculties } from "../faculties/facultySlice";
import { MenuItem, Select } from "@mui/material";
import { CountryGet } from "../countries/countryModel";
import { FacultyGet } from "../faculties/facultyModel";
import background from "../img/background.jpeg";

export default function RegisterPage() {
  const appDispatch = useAppDispatch();
  const { allCountries } = useAppSelector((state) => state.countries);
  const { allFaculties } = useAppSelector((state) => state.faculties);
  const [signUpUser, setSignUpUser] = useState<UserPost>({
    name: "",
    surname: "",
    dateOfBirth: new Date(0),
    address: "",
    city: "",
    countryId: "",
    facultyId: "",
    email: "",
    userName: "",
    password: "",
  });

  useEffect(() => {
    appDispatch(GetAllCountries());
    appDispatch(GetAllFaculties());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    appDispatch(SignUp(signUpUser));
    setTimeout(function () {
      window.location.href = "http://localhost:3000/home";
    }, 1000);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
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
            Sign Up
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Surname"
              name="surname"
              autoComplete="surname"
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              type="date"
              margin="normal"
              required
              fullWidth
              id="dateOfBirth"
              //label="Date Of Birth"
              name="dateOfBirth"
              autoComplete="dateOfBirth"
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Select
              defaultValue=""
              fullWidth
              name="countryId"
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  countryId: e.target.value,
                })
              }
            >
              {allCountries.map((item: CountryGet) => (
                <MenuItem key={item.countryId} value={item.countryId}>
                  {item.countryName}
                </MenuItem>
              ))}
            </Select>
            <Select
              defaultValue="null"
              fullWidth
              name="facultyId"
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  facultyId: e.target.value,
                })
              }
            >
              {allFaculties.map((item: FacultyGet) => (
                <MenuItem key={item.facultyId} value={item.facultyId}>
                  {item.facultyName}
                </MenuItem>
              ))}
            </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="userName"
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  [e.target.name]: e.target.value,
                })
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
                setSignUpUser({
                  ...signUpUser,
                  [e.target.name]: e.target.value,
                })
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to={"/home"}>{"Already have an account? Sign In"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </div>
  );
}
