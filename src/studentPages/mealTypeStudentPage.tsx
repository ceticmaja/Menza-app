import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GetAllMealTypes } from "../mealtypes/mealTypeSlice";
import background from "../img/background.jpeg";
import MealTypeCard from "./mealTypeCardStudent";
import { Grid } from "@mui/material";

export default function MealTypeStudentPage() {
  const appDispatch = useAppDispatch();
  const { allMealTypes } = useAppSelector((state) => state.mealTypes);

  useEffect(() => {
    appDispatch(GetAllMealTypes());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "88vh",
      }}
    >
      <Grid container justifyContent="space-evenly" direction="row">
        {allMealTypes.map((meal) => (
          <Grid item marginTop={"30px"}>
            <MealTypeCard meal={meal} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
