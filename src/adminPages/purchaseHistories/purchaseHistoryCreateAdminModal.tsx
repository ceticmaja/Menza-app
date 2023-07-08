import { PurchaseHistoryPost } from "../../purchasehistories/purchaseHistoryModel";
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
  onSubmit: (values: PurchaseHistoryPost) => void;
  open: boolean;
}

const CreateNewPurchaseHistoryModal = ({
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [newPurchaseHistory, setNewPurchaseHistory] =
    useState<PurchaseHistoryPost>({
      purchaseDate: new Date(0),
      createdBy: "",
      status: "",
    });

  const handleSubmit = () => {
    onSubmit(newPurchaseHistory);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New PurchaseHistory</DialogTitle>
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
              name="purchaseDate"
              type="date"
              onChange={(e) =>
                setNewPurchaseHistory({
                  ...newPurchaseHistory,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Created By"
              name="createdBy"
              onChange={(e) =>
                setNewPurchaseHistory({
                  ...newPurchaseHistory,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              label="Status"
              name="status"
              onChange={(e) =>
                setNewPurchaseHistory({
                  ...newPurchaseHistory,
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
          Create New Purchase History
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewPurchaseHistoryModal;
