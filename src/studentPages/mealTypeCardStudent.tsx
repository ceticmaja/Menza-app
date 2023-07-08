import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { MealTypeGet } from "../mealtypes/mealTypeModel";
import { loadStripe, RedirectToCheckoutOptions } from "@stripe/stripe-js";

interface MealTypeCardProps {
  meal: MealTypeGet;
}

const MealTypeCard = ({ meal }: MealTypeCardProps) => {
  let stripePromise: Promise<any> | null = null;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_test_51NREjsEZQJxuqeHRA575B9VEshheOmf70FlJHe7cHNJQFq1hcdD3Pw7YPxCH6aRhZM99x7XvBmhazSMksxzj7PXZ00pVoEsR66"
      );
    }
    return stripePromise;
  };

  const item = {
    price: meal.mealPriceId,
    quantity: 1,
  };

  const checkoutOptions: RedirectToCheckoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/student/successPayment`,
    cancelUrl: `${window.location.origin}/student/canceledPayment`,
  };

  const redirectToCheckout = async () => {
    console.log("redirectToCheckout");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);
  };

  return (
    <Card sx={{ width: 150 }} key={meal.mealTypeId}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.primary"
          gutterBottom
        ></Typography>
        <Typography variant="h5" component="div">
          {meal.mealName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary">
          RSD {meal.mealPrice}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={redirectToCheckout}>KUPI</Button>
      </CardActions>
    </Card>
  );
};

export default MealTypeCard;
