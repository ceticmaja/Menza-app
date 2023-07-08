import { PurchaseItemPut } from "../../purchaseitems/purchaseItemModel";
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
  row: PurchaseItemPut;
  onClose: () => void;
  onSubmit: (values: PurchaseItemPut) => void;
  open: boolean;
}

const UpdatePurchaseItemModal = ({
  row,
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const appDispatch = useAppDispatch();
  const { allPurchaseHistories } = useAppSelector(
    (state) => state.purchasehistories
  );
  const { allMealTypes } = useAppSelector((state) => state.mealTypes);
  const [updatePurchaseItem, setUpdatePurchaseItem] = useState<PurchaseItemPut>(
    {
      purchaseItemId: "",
      purchaseQuantity: "",
      purchaseHistoryId: "",
      mealTypeId: "",
    }
  );

  useEffect(() => {
    appDispatch(GetAllPurchaseHistories());
    appDispatch(GetAllMealTypes());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUpdatePurchaseItem(row);
  }, [row]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    onSubmit({
      purchaseItemId: row.purchaseItemId,
      purchaseQuantity: updatePurchaseItem.purchaseQuantity,
      purchaseHistoryId: updatePurchaseItem.purchaseHistoryId,
      mealTypeId: updatePurchaseItem.mealTypeId,
    });
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Update PurchaseItem</DialogTitle>
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
              name="id"
              value={updatePurchaseItem.purchaseItemId}
            />
            <TextField
              label="purchaseQuantity"
              name="purchaseQuantity"
              value={updatePurchaseItem.purchaseQuantity}
              onChange={(e) =>
                setUpdatePurchaseItem({
                  ...updatePurchaseItem,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Select
              value={updatePurchaseItem.purchaseHistoryId}
              name="purchaseHistoryId"
              onChange={(e) =>
                setUpdatePurchaseItem({
                  ...updatePurchaseItem,
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
              value={updatePurchaseItem.mealTypeId}
              name="mealTypeId"
              onChange={(e) =>
                setUpdatePurchaseItem({
                  ...updatePurchaseItem,
                  mealTypeId: e.target.value,
                })
              }
            >
              {allMealTypes.map((item: MealTypeGet) => (
                <MenuItem key={item.mealTypeId} value={item.mealTypeId}>
                  {item.mealName}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Update PurchaseItem
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePurchaseItemModal;
