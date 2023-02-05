import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import FinishedGoods from "./components/FinishedGoods";
import Inventory from "./components/Inventory";
import Login from "./components/Login";
import ManageAccount from "./components/ManageAccount";
import ManageAttendance from "./components/ManageAttendance";
import ManageCapital from "./components/ManageCapital";
import ManageEmployee from "./components/ManageEmployee";
import ManageExpense from "./components/ManageExpense";
import ManagePayments from "./components/ManagePayments";
import ManageProduct from "./components/ManageProduct";
import ManageProduction from "./components/ManageProduction";
import ManagePurchase from "./components/ManagePurchase";
import ManageRawMaterial from "./components/ManageRawMaterial";
import ManageSalary from "./components/ManageSalary";
import ManageSale from "./components/ManageSale";
import ManageUsers from "./components/ManageUsers";
import Sidenav from "./components/Sidenav";

function App() {
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [access, setAccess] = useState({});
  const [login, setLogin] = useState(false);
  if (!login)
    return (
      <>
        <Login
          setToast={setToast}
          setToastMsg={setToastMsg}
          setLogin={setLogin}
          setAccess={setAccess}
        />
        <ToastContainer className="p-3" position={"bottom-end"}>
          <Toast
            onClose={() => setToast(false)}
            show={toast}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={false}>
              <strong className="me-auto">System</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>{toastMsg}</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  return (
    <div className="app">
      <Sidenav setLogin={setLogin} access={access} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Dashboard setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_accounts"
          element={
            <ManageAccount setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_employees"
          element={
            <ManageEmployee setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_capitals"
          element={
            <ManageCapital setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_rawMaterials"
          element={
            <ManageRawMaterial setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_products"
          element={
            <ManageProduct setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_purchases"
          element={
            <ManagePurchase setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_sales"
          element={<ManageSale setToast={setToast} setToastMsg={setToastMsg} />}
        />
        <Route
          exact
          path="/manage_expenses"
          element={
            <ManageExpense setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_productions"
          element={
            <ManageProduction setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_attendance"
          element={
            <ManageAttendance setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_salary"
          element={
            <ManageSalary setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_payments"
          element={
            <ManagePayments setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/inventory"
          element={<Inventory setToast={setToast} setToastMsg={setToastMsg} />}
        />
        <Route
          exact
          path="/finished_goods"
          element={
            <FinishedGoods setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
        <Route
          exact
          path="/manage_users"
          element={
            <ManageUsers setToast={setToast} setToastMsg={setToastMsg} />
          }
        />
      </Routes>
      <ToastContainer className="p-3" position={"bottom-end"}>
        <Toast
          onClose={() => setToast(false)}
          show={toast}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">System</strong>
            <small>Just Now</small>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
