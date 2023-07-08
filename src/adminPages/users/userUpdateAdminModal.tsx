import { UserPut } from "../../users/userModel";
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
  row: UserPut;
  onClose: () => void;
  onSubmit: (values: UserPut) => void;
  open: boolean;
}

const UpdateUserModal = ({
  row,
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const appDispatch = useAppDispatch();
  const { allCountries } = useAppSelector((state) => state.countries);
  const { allFaculties } = useAppSelector((state) => state.faculties);
  const [updateUser, setUpdateUser] = useState<UserPut>({
    id: "",
    name: "",
    surname: "",
    dateOfBirth: new Date(0),
    address: "",
    city: "",
    countryId: "",
    facultyId: "",
    email: "",
    userName: "",
  });

  useEffect(() => {
    appDispatch(GetAllCountries());
    appDispatch(GetAllFaculties());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUpdateUser(row);
  }, [row]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    onSubmit({
      id: row.id,
      name: updateUser.name,
      surname: updateUser.surname,
      dateOfBirth: updateUser.dateOfBirth,
      address: updateUser.address,
      city: updateUser.city,
      countryId: updateUser.countryId,
      facultyId: updateUser.facultyId,
      email: updateUser.email,
      userName: updateUser.userName,
    });
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Update User</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <TextField disabled name="id" value={updateUser.id} />
            <TextField
              label="Name"
              name="name"
              value={updateUser.name}
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Surname"
              name="surname"
              value={updateUser.surname}
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="DateOfBirth"
              type="date"
              value={updateUser.dateOfBirth}
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Address"
              name="address"
              value={updateUser.address}
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="City"
              name="city"
              value={updateUser.city}
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Select
              value={updateUser.countryId ?? " "}
              name="countryId"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
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
              value={updateUser.facultyId ?? " "}
              name="facultyId"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
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
              value={updateUser.email}
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="UserName"
              name="userName"
              value={updateUser.userName}
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Update User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserModal;
