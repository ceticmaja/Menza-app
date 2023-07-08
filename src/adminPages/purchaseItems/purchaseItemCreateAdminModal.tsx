import { PurchaseItemPost } from "../../purchaseitems/purchaseItemModel";
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
import { GetAllPurchaseHistories } from "../../purchasehistories/purchaseHistorySlice";
import { GetAllMealTypes } from "../../mealtypes/mealTypeSlice";
import { PurchaseHistoryGet } from "../../purchasehistories/purchaseHistoryModel";
import { MealTypeGet, MealTypePost } from "../../mealtypes/mealTypeModel";

interface CreateModalProps {
  onClose: () => void;
  onSubmit: (values: PurchaseItemPost) => void;
  open: boolean;
}

const CreateNewPurchaseItemModal = ({
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const appDispatch = useAppDispatch();
  const { allMealTypes } = useAppSelector((state) => state.mealTypes);
  const { allPurchaseHistories } = useAppSelector(
    (state) => state.purchasehistories
  );
  const [newPurchaseItem, setNewPurchaseItem] = useState<PurchaseItemPost>({
    purchaseQuantity: "",
    purchaseHistoryId: "",
    mealTypeId: "",
  });

  useEffect(() => {
    appDispatch(GetAllPurchaseHistories());
    appDispatch(GetAllMealTypes());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    onSubmit(newPurchaseItem);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New PurchaseItem</DialogTitle>
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
              label="PurchaseQuantity"
              name="purchaseQuantity"
              onChange={(e) =>
                setNewPurchaseItem({
                  ...newPurchaseItem,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Select
              defaultValue=""
              name="purchaseHistoryId"
              onChange={(e) =>
                setNewPurchaseItem({
                  ...newPurchaseItem,
                  purchaseHistoryId: e.target.value,
                })
              }
            >
              {allPurchaseHistories.map((item: PurchaseHistoryGet) => (
                <MenuItem
                  key={item.purchaseHistoryId}
                  value={item.purchaseHistoryId}
                >
                  {item.purchaseHistoryId}
                </MenuItem>
              ))}
            </Select>
            <Select
              defaultValue=""
              name="mealTypeId"
              onChange={(e) =>
                setNewPurchaseItem({
                  ...newPurchaseItem,
                  mealTypeId: e.target.value,
                })
              }
            >
              {allMealTypes.map((item: MealTypeGet) => (
                <MenuItem key={item.mealTypeId} value={item.mealTypeId}>
                  {item.mealTypeId}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create New PurchaseItem
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewPurchaseItemModal;
