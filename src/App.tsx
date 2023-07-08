import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoleAdminPage from "./adminPages/roles/roleAdminPage";
import UserAdminPage from "./adminPages/users/userAdminPage";
import MenuAdminPage from "./adminPages/menus/menuAdminPage";
import FacultyAdminPage from "./adminPages/faculties/facultyAdminPage";
import CountryAdminPage from "./adminPages/countries/countryAdminPage";
import MealTypeAdminPage from "./adminPages/mealTypes/mealTypeAdminPage";
import PurchaseHistoryAdminPage from "./adminPages/purchaseHistories/purchaseHistoryAdminPage";
import PurchaseItemAdminPage from "./adminPages/purchaseItems/purchaseItemAdminPage";
import PurchaseHistoryStudentPage from "./studentPages/purchaseHistoriesStudentPage";
import MenuStudentPage from "./studentPages/menusStudentPage";
import MealTypesStudentPage from "./studentPages/mealTypeStudentPage";
import SuccessPayment from "./studentPages/successPaymentStudent";
import CanceledPayment from "./studentPages/canceledPaymentStudent";
import HomePage from "./pages/homePage";
import RegisterPage from "./pages/registerPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/users" element={<UserAdminPage />} />
          <Route path="/admin/roles" element={<RoleAdminPage />} />
          <Route
            path="/admin/purchaseItems"
            element={<PurchaseItemAdminPage />}
          />
          <Route
            path="/admin/purchaseHistories"
            element={<PurchaseHistoryAdminPage />}
          />
          <Route path="/admin/menus" element={<MenuAdminPage />} />
          <Route path="/admin/mealTypes" element={<MealTypeAdminPage />} />
          <Route path="/admin/faculties" element={<FacultyAdminPage />} />
          <Route path="/admin/countries" element={<CountryAdminPage />} />
          <Route
            path="/student/purchaseHistories"
            element={<PurchaseHistoryStudentPage />}
          />
          <Route path="/student/menus" element={<MenuStudentPage />} />
          <Route path="/student/mealTypes" element={<MealTypesStudentPage />} />
          <Route path="/student/successPayment" element={<SuccessPayment />} />
          <Route
            path="/student/canceledPayment"
            element={<CanceledPayment />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
