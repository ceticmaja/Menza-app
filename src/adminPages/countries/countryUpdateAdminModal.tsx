import { CountryPut } from "../../countries/countryModel";
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
  row: CountryPut;
  onClose: () => void;
  onSubmit: (values: CountryPut) => void;
  open: boolean;
}

const UpdateCountryModal = ({
  row,
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [updateCountry, setUpdateCountry] = useState<CountryPut>({
    countryId: "",
    countryName: "",
  });

  useEffect(() => {
    setUpdateCountry(row);
  }, [row]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    onSubmit({
      countryId: row.countryId,
      countryName: updateCountry.countryName,
    });
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Update Country</DialogTitle>
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
              name="countryId"
              value={updateCountry.countryId}
            />
            <TextField
              label="CountryName"
              name="countryName"
              value={updateCountry.countryName}
              onChange={(e) =>
                setUpdateCountry({
                  ...updateCountry,
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
          Update Country
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCountryModal;
