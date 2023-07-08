import { MealTypePut } from "../../mealtypes/mealTypeModel";
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
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface CreateModalProps {
  row: MealTypePut;
  onClose: () => void;
  onSubmit: (values: MealTypePut) => void;
  open: boolean;
}

const UpdateMealTypeModal = ({
  row,
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [updateMealType, setUpdateMealType] = useState<MealTypePut>({
    mealTypeId: "",
    mealName: "",
    mealPrice: 0,
    mealPriceId: "",
  });

  useEffect(() => {
    setUpdateMealType(row);
  }, [row]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    onSubmit({
      mealTypeId: row.mealTypeId,
      mealName: updateMealType.mealName,
      mealPrice: updateMealType.mealPrice,
      mealPriceId: updateMealType.mealPriceId,
    });
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Update MealType</DialogTitle>
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
              name="mealTypeId"
              value={updateMealType.mealTypeId}
            />
            <TextField
              label="Meal Name"
              name="mealName"
              value={updateMealType.mealName}
              onChange={(e) =>
                setUpdateMealType({
                  ...updateMealType,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Meal Price"
              name="mealPrice"
              value={updateMealType.mealPrice}
              onChange={(e) =>
                setUpdateMealType({
                  ...updateMealType,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Meal Type Price Id"
              name="mealPriceId"
              value={updateMealType.mealPriceId}
              onChange={(e) =>
                setUpdateMealType({
                  ...updateMealType,
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
          Update MealType
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateMealTypeModal;
