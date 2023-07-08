import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import background from "../img/background.jpeg";
import { PurchaseHistoryPost } from "../purchasehistories/purchaseHistoryModel";
import { PostPurchaseHistory } from "../purchasehistories/purchaseHistorySlice";

export default function CanceledPayment() {
  const appDispatch = useAppDispatch();
  const [newPurchaseHistory] = useState<PurchaseHistoryPost>({
    purchaseDate: new Date(),
    createdBy: localStorage.getItem("userId") as string,
    status: "Failed",
  });

  useEffect(() => {
    appDispatch(PostPurchaseHistory(newPurchaseHistory));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "88vh",
      }}
    >
      <Grid container>
        <Grid item xs={4} marginTop="25vh" marginLeft="37vw">
          <Typography color="white" variant="h3">
            Payment failed!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
