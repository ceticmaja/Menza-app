import { MenuPut } from "../../menus/menuModel";
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
import { GetAllUsers } from "../../users/userSlice";
import { UserGet } from "../../users/userModel";

interface CreateModalProps {
  row: MenuPut;
  onClose: () => void;
  onSubmit: (values: MenuPut) => void;
  open: boolean;
}

const UpdateMenuModal = ({
  row,
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const appDispatch = useAppDispatch();
  const { allUsers } = useAppSelector((state) => state.users);
  const [updateMenu, setUpdateMenu] = useState<MenuPut>({
    menuId: "",
    publishDate: new Date(0),
    editDate: new Date(0),
    description: "",
    userId: "",
  });

  useEffect(() => {
    appDispatch(GetAllUsers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUpdateMenu(row);
  }, [row]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    onSubmit({
      menuId: row.menuId,
      publishDate: updateMenu.publishDate,
      editDate: updateMenu.editDate,
      description: updateMenu.description,
      userId: updateMenu.userId,
    });
    console.log(updateMenu);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Update Menu</DialogTitle>
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
              name="menuId"
              value={updateMenu.menuId}
              onChange={(e) =>
                setUpdateMenu({
                  ...updateMenu,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="PublishDate"
              type="date"
              value={updateMenu.publishDate}
              onChange={(e) =>
                setUpdateMenu({
                  ...updateMenu,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="EditDate"
              type="date"
              value={updateMenu.editDate}
              onChange={(e) =>
                setUpdateMenu({
                  ...updateMenu,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Description"
              name="description"
              value={updateMenu.description}
              onChange={(e) =>
                setUpdateMenu({
                  ...updateMenu,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Select
              value={updateMenu.userId ?? " "}
              name="userId"
              onChange={(e) =>
                setUpdateMenu({
                  ...updateMenu,
                  userId: e.target.value,
                })
              }
            >
              {allUsers.map((item: UserGet) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.userName}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Update Menu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateMenuModal;
