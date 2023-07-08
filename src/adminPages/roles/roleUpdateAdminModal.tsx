import { RolePut } from "../../roles/roleModel";
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
  row: RolePut;
  onClose: () => void;
  onSubmit: (values: RolePut) => void;
  open: boolean;
}

const UpdateRoleModal = ({
  row,
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [updateRole, setUpdateRole] = useState<RolePut>({
    id: "",
    name: "",
  });

  useEffect(() => {
    setUpdateRole({ id: row.id, name: row.name });
  }, [row]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    onSubmit({ id: row.id, name: updateRole.name });
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Update Role</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <TextField disabled name="id" value={row.id} />
            <TextField
              name="name"
              value={updateRole.name}
              onChange={(e) => {
                setUpdateRole({ ...updateRole, name: e.target.value });
              }}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Update Role
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateRoleModal;
