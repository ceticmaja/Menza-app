import { FacultyPut } from "../../faculties/facultyModel";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

interface CreateModalProps {
  row: FacultyPut;
  onClose: () => void;
  onSubmit: (values: FacultyPut) => void;
  open: boolean;
}

const UpdateFacultyModal = ({
  row,
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [updateFaculty, setUpdateFaculty] = useState<FacultyPut>({
    facultyId: "",
    facultyName: "",
    facultyCity: "",
    facultyAddress: "",
  });

  useEffect(() => {
    setUpdateFaculty(row);
  }, [row]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    onSubmit({
      facultyId: row.facultyId,
      facultyName: updateFaculty.facultyName,
      facultyCity: updateFaculty.facultyCity,
      facultyAddress: updateFaculty.facultyAddress,
    });
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Update Faculty</DialogTitle>
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
              disabled
              name="facultyId"
              value={updateFaculty.facultyId}
            />
            <TextField
              label="FacultyName"
              name="facultyName"
              value={updateFaculty.facultyName}
              onChange={(e) =>
                setUpdateFaculty({
                  ...updateFaculty,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="FacultyCity"
              name="facultyCity"
              value={updateFaculty.facultyCity}
              onChange={(e) =>
                setUpdateFaculty({
                  ...updateFaculty,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="FacultyAddress"
              name="facultyAddress"
              value={updateFaculty.facultyAddress}
              onChange={(e) =>
                setUpdateFaculty({
                  ...updateFaculty,
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
          Update Faculty
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateFacultyModal;
