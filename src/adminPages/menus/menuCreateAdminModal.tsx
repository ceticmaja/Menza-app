import { MenuPost } from "../../menus/menuModel";
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
  onClose: () => void;
  onSubmit: (values: MenuPost) => void;
  open: boolean;
}

const CreateNewMenuModal = ({ open, onClose, onSubmit }: CreateModalProps) => {
  const [newMenu, setNewMenu] = useState<MenuPost>({
    publishDate: new Date(0),
    editDate: new Date(0),
    description: "",
    userId: localStorage.getItem("userId") as string,
  });

  const handleSubmit = () => {
    onSubmit(newMenu);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Menu</DialogTitle>
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
              name="publishDate"
              type="date"
              onChange={(e) =>
                setNewMenu({ ...newMenu, [e.target.name]: e.target.value })
              }
            />
            <TextField
              name="editDate"
              type="date"
              onChange={(e) =>
                setNewMenu({ ...newMenu, [e.target.name]: e.target.value })
              }
            />
            <TextField
              label="Description"
              name="description"
              onChange={(e) =>
                setNewMenu({ ...newMenu, [e.target.name]: e.target.value })
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create New Menu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewMenuModal;
