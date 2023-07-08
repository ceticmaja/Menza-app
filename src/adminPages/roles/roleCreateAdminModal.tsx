import { RolePost } from "../../roles/roleModel";
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
  onSubmit: (values: RolePost) => void;
  open: boolean;
}

const CreateNewRoleModal = ({ open, onClose, onSubmit }: CreateModalProps) => {
  const [newRole, setNewRole] = useState<RolePost>({ name: "" });

  const handleSubmit = () => {
    onSubmit(newRole);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Role</DialogTitle>
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
                setNewRole({ ...newRole, [e.target.name]: e.target.value })
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create New Role
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewRoleModal;
