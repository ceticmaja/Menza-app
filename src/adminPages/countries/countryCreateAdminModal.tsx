import { CountryPost } from "../../countries/countryModel";
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
  onSubmit: (values: CountryPost) => void;
  open: boolean;
}

const CreateNewCountryModal = ({
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [newCountry, setNewCountry] = useState<CountryPost>({
    countryName: "",
  });

  const handleSubmit = () => {
    onSubmit(newCountry);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Country</DialogTitle>
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
              label="CountryName"
              name="countryName"
              onChange={(e) =>
                setNewCountry({
                  ...newCountry,
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
          Create New Country
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewCountryModal;
