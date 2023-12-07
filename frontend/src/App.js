import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./stylesheets/alignments.css";
import "./stylesheets/theme.css";
import "./stylesheets/sizes.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import Profile from "./pages/Profile";
import AddPayment from './pages/Payment/AddPayment';
import PaymentSuccess from './pages/Payment/PaymentSuccess';
import Payments from './pages/Payment/Payments';
import PaymentHistory from './pages/Payment/PaymentHistory';
import Refunds from './pages/Refund/Refunds';
import AddRefund from './pages/Refund/AddRefund';
import UpdateRefund from './pages/Refund/UpdateRefund';
import AddPatient from './pages/Patient/AddPatient';
import AddPatients from './pages/Patient/AddPatients';
import Tests from './pages/Patient/Tests';
import ProductList from './pages/Drug/ProductList';
import AddDrugs from './pages/Drug/AddDrugs';
import ViewDrug from './pages/Drug/ViewDrug';
import UpdateDrug from './pages/Drug/UpdateDrug';
import Prescription from './pages/Prescription/Prescription';
import AllPrescription from './pages/Prescription/AllPrescription';
import Appointments from './pages/Profile/';
import UpdatedPrescription from './pages/Prescription/UpdatePrescription';
import DeletePrescription from './pages/Prescription/DeletePrescription';
import Members from "./pages/Profile/Members";
import MembersHr from "./pages/Profile/memberHr";
import Salary from "./pages/Profile/Salary";
import SalaryView from "./pages/Profile/salaryHr/salaryView";
import SalaryHr from "./pages/Profile/salaryHr";
import SelectType from './pages/Patient/SelectType';
import Urinalysis from './pages/Patient/Urinalysis';
import AddInventory from './pages/Inventory/AddInventory';
import ViewInventory from './pages/Inventory/ViewInventory';
import EditInventory from './pages/Inventory/EditInventory';
import ManagerHome from './pages/Manager/ManagerHome';
function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewappointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paymentsuccess/:invoiceNumber"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-history"
            element={
              <ProtectedRoute>
                <PaymentHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/refunds"
            element={
              <ProtectedRoute>
                <Refunds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addInventory"
            element={
              <ProtectedRoute>
                <AddInventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editInventory/:id"
            element={
              <ProtectedRoute>
                <EditInventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewInventory"
            element={
              <ProtectedRoute>
                <ViewInventory/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-history"
            element={
              <ProtectedRoute>
                <PaymentHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addrefund"
            element={
              <ProtectedRoute>
                <AddRefund />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updaterefund/:id"
            element={
              <ProtectedRoute>
                <UpdateRefund />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/register" element={

            <Register />
          } />
          <Route path="/addPatient" exact element={

            <ProtectedRoute>
              <AddPatient />
            </ProtectedRoute>
          } />
          <Route path="/registerPatient" exact element={

            <ProtectedRoute>
              <AddPatients />
            </ProtectedRoute>
          } />
          <Route path="/adddrug" exact element={

            <ProtectedRoute>
              <AddDrugs/>
            </ProtectedRoute>
          } />
          <Route path="/create-test" exact element={

            <ProtectedRoute>
              <SelectType/>
            </ProtectedRoute>
          } />
          <Route path="/create-urine" exact element={

            <ProtectedRoute>
              <Urinalysis/>
            </ProtectedRoute>
          } />
          <Route path="/druglist" exact element={

            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          } />
          <Route path="/viewdrug" exact element={

            <ProtectedRoute>
              <ViewDrug />
            </ProtectedRoute>
          } />
          <Route path="/updatedrug/:id" exact element={

            <ProtectedRoute>
              <UpdateDrug />
            </ProtectedRoute>
          } />
          <Route path="/prescription" exact element={

            <ProtectedRoute>
              <Prescription />
            </ProtectedRoute>
          } />
          <Route path="/all-prescription" exact element={
            <ProtectedRoute>
              <AllPrescription />
            </ProtectedRoute>
          } />
          <Route path="/update-prescription/:id" exact element={
            <ProtectedRoute>
              <UpdatedPrescription />
            </ProtectedRoute>
          } />
          <Route path="/delete-prescription/:id" exact element={

            <ProtectedRoute>
              <DeletePrescription />
            </ProtectedRoute>
          } />
          <Route path="/createTest" exact element={
             <ProtectedRoute><Tests /></ProtectedRoute>
          } />
          <Route
            path="/manager"
            element={
              <ProtectedRoute><Members /></ProtectedRoute>
            }
          />
          <Route
            path="/managerhome"
            element={
              <ProtectedRoute><ManagerHome/></ProtectedRoute>
            }
          />

          <Route
            path="/memberHr"
            element={
              <ProtectedRoute><MembersHr /></ProtectedRoute>
            }
          />

          <Route
            path="/salaryHR"
            element={
              <ProtectedRoute><Salary /></ProtectedRoute>
            }
          />

          <Route
            path="/salaryV"
            element={
              <ProtectedRoute><SalaryHr /></ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
