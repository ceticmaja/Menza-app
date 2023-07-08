import { MealTypePost } from "../../mealtypes/mealTypeModel";
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
  onSubmit: (values: MealTypePost) => void;
  open: boolean;
}

const CreateNewMealTypeModal = ({
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [newMealType, setNewMealType] = useState<MealTypePost>({
    mealName: "",
    mealPrice: 0,
    mealPriceId: "",
  });

  const handleSubmit = () => {
    onSubmit(newMealType);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New MealType</DialogTitle>
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
              label="Meal Name"
              name="mealName"
              onChange={(e) =>
                setNewMealType({
                  ...newMealType,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Meal Price"
              name="mealPrice"
              onChange={(e) =>
                setNewMealType({
                  ...newMealType,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Meal Type Price Id"
              name="mealPriceId"
              onChange={(e) =>
                setNewMealType({
                  ...newMealType,
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
          Create New MealType
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewMealTypeModal;
