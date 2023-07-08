import { PurchaseHistoryPut } from "../../purchasehistories/purchaseHistoryModel";
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
  row: PurchaseHistoryPut;
  onClose: () => void;
  onSubmit: (values: PurchaseHistoryPut) => void;
  open: boolean;
}

const UpdatePurchaseHistoryModal = ({
  row,
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [updatePurchaseHistory, setUpdatePurchaseHistory] =
    useState<PurchaseHistoryPut>({
      purchaseHistoryId: "",
      purchaseDate: new Date(0),
      createdBy: "",
      status: "",
    });

  useEffect(() => {
    setUpdatePurchaseHistory(row);
  }, [row]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    onSubmit({
      purchaseHistoryId: row.purchaseHistoryId,
      purchaseDate: updatePurchaseHistory.purchaseDate,
      createdBy: updatePurchaseHistory.createdBy,
      status: updatePurchaseHistory.status,
    });
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Update PurchaseHistory</DialogTitle>
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
              name="purchaseHistoryId"
              value={updatePurchaseHistory.purchaseHistoryId}
            />
            <TextField
              name="purchaseDate"
              type="date"
              value={updatePurchaseHistory.purchaseDate}
              onChange={(e) =>
                setUpdatePurchaseHistory({
                  ...updatePurchaseHistory,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Created By"
              name="createdBy"
              value={updatePurchaseHistory.createdBy}
              onChange={(e) =>
                setUpdatePurchaseHistory({
                  ...updatePurchaseHistory,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Status"
              name="status"
              value={updatePurchaseHistory.status}
              onChange={(e) =>
                setUpdatePurchaseHistory({
                  ...updatePurchaseHistory,
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
          Update PurchaseHistory
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePurchaseHistoryModal;
