import { FacultyPost } from "../../faculties/facultyModel";
import { useState } from "react";
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
  onClose: () => void;
  onSubmit: (values: FacultyPost) => void;
  open: boolean;
}

const CreateNewFacultyModal = ({
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [newFaculty, setNewFaculty] = useState<FacultyPost>({
    facultyName: "",
    facultyCity: "",
    facultyAddress: "",
  });

  const handleSubmit = () => {
    onSubmit(newFaculty);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Faculty</DialogTitle>
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
              label="FacultyName"
              name="facultyName"
              onChange={(e) =>
                setNewFaculty({
                  ...newFaculty,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="FacultyCity"
              name="facultyCity"
              onChange={(e) =>
                setNewFaculty({
                  ...newFaculty,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="FacultyAddress"
              name="facultyAddress"
              onChange={(e) =>
                setNewFaculty({
                  ...newFaculty,
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
          Create New Faculty
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewFacultyModal;
