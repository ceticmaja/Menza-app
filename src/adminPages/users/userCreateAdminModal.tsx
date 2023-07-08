import { UserPost } from "../../users/userModel";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetAllCountries } from "../../countries/countrySlice";
import { GetAllFaculties } from "../../faculties/facultySlice";
import { CountryGet } from "../../countries/countryModel";
import { FacultyGet } from "../../faculties/facultyModel";

interface CreateModalProps {
  onClose: () => void;
  onSubmit: (values: UserPost) => void;
  open: boolean;
}

const CreateNewUserModal = ({ open, onClose, onSubmit }: CreateModalProps) => {
  const appDispatch = useAppDispatch();
  const { allCountries } = useAppSelector((state) => state.countries);
  const { allFaculties } = useAppSelector((state) => state.faculties);
  const [newUser, setNewUser] = useState<UserPost>({
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

  const handleSubmit = () => {
    onSubmit(newUser);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New User</DialogTitle>
      <br></br>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <TextField
              label="Name"
              name="name"
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
            <TextField
              label="Surname"
              name="surname"
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
            <TextField
              name="dateOfBirth"
              type="date"
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
            <TextField
              label="Address"
              name="address"
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
            <TextField
              label="City"
              name="city"
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
            <Select
              defaultValue=""
              name="countryId"
              onChange={(e) =>
                setNewUser({
                  ...newUser,
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
              defaultValue=""
              name="facultyId"
              onChange={(e) =>
                setNewUser({
                  ...newUser,
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
              label="Email"
              name="email"
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
            <TextField
              label="UserName"
              name="userName"
              onChange={(e) =>
                setNewUser({ ...newUser, [e.target.name]: e.target.value })
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create New User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewUserModal;
