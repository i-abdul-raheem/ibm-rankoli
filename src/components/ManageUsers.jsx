import { useEffect, useState } from "react";
import { Card, Button, Container, Table, Modal, Form } from "react-bootstrap";

export default function ManageUsers(props) {
  const [viewModal, setViewModal] = useState(false);
  const [viewModalId, setViewModalId] = useState("1");
  const [users, setUsers] = useState([]);
  const [viewForm, setViewForm] = useState({
    finishedGoods: false,
    inventory: false,
    manageAccount: false,
    manageAttendance: false,
    manageCapital: false,
    manageEmployee: false,
    managePayments: false,
    manageExpense: false,
    manageProduct: false,
    manageProduction: false,
    managePurchase: false,
    manageRawMaterial: false,
    manageSalary: false,
    manageSale: false,
    manageUsers: false,
  });
  const [employees, setEmployees] = useState([]);
  const updateEmployees = async () => {
    const res = await fetch("http://localhost:5000/employees").then((res) =>
      res.json()
    );
    setEmployees(res.data);
  };
  const updateUsers = async () => {
    const res = await fetch("http://localhost:5000/users").then((res) =>
      res.json()
    );
    setUsers(res.data);
  };
  const updateRoles = async (cnic) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: viewForm }),
    };
    const res = await fetch(
      `http://localhost:5000/users/role/${cnic}`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    updateUsers();
    setViewModal(false);
    updateEmployees();
  };
  useEffect(() => {
    updateEmployees();
    updateUsers();
  }, []);
  const getRoles = (cnic) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === cnic) return users[i].role;
    }
    return {
      finishedGoods: false,
      inventory: false,
      manageAccount: false,
      manageAttendance: false,
      manageCapital: false,
      manageEmployee: false,
      managePayments: false,
      manageExpense: false,
      manageProduct: false,
      manageProduction: false,
      managePurchase: false,
      manageRawMaterial: false,
      manageSalary: false,
      manageSale: false,
      manageUsers: false,
    };
  };
  const checkUserExist = (cnic) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === cnic) return false;
    }
    return true;
  };
  const checkUserStatus = (cnic) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === cnic) return users[i].status;
    }
    return false;
  };
  const activateUser = async (cnic) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `http://localhost:5000/users/activate/${cnic}`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    updateUsers();
    updateEmployees();
  };
  const deactivateUser = async (cnic) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `http://localhost:5000/users/deactivate/${cnic}`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    updateUsers();
    updateEmployees();
  };
  const createUser = async (cnic, email) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: cnic, email }),
    };
    const res = await fetch(`http://localhost:5000/users/`, options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
    updateUsers();
    updateEmployees();
  };
  return (
    <Container>
      <Card>
        <Card.Header>Manage Users</Card.Header>
        <Card.Body>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Department</th>
                <th>Activate</th>
                <th>Grant Access</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((i, index) => {
                return (
                  <tr key={`user-${index}`}>
                    <td>{index + 1}</td>
                    <td>{i.title}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {i.employeeType}
                    </td>
                    <td>
                      {!checkUserExist(i.cnic) ? (
                        !checkUserStatus(i.cnic) ? (
                          <Button
                            onClick={() => activateUser(i.cnic)}
                            variant="success"
                          >
                            Activate
                          </Button>
                        ) : (
                          <Button
                            onClick={() => deactivateUser(i.cnic)}
                            variant="danger"
                          >
                            Deactivate
                          </Button>
                        )
                      ) : (
                        <Button
                          onClick={() => createUser(i.cnic, i.email)}
                          variant="primary"
                        >
                          Create Account
                        </Button>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setViewForm(getRoles(i.cnic));
                          setViewModalId(i.cnic);
                          setViewModal(true);
                        }}
                        disabled={checkUserExist(i.cnic)}
                      >
                        Grant Access
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={viewModal} fullscreen>
        <Modal.Header
          onHide={() => setViewModal(false)}
          closeButton
        ></Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Header>Accress Control</Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>Access</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Finished Goods</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            finishedGoods: !viewForm.finishedGoods,
                          })
                        }
                        defaultChecked={viewForm.finishedGoods}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Inventory</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            inventory: !viewForm.inventory,
                          })
                        }
                        defaultChecked={viewForm.inventory}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Account</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageAccount: !viewForm.manageAccount,
                          })
                        }
                        defaultChecked={viewForm.manageAccount}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Attendance</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageAttendance: !viewForm.manageAttendance,
                          })
                        }
                        defaultChecked={viewForm.manageAttendance}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Capital</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageCapital: !viewForm.manageCapital,
                          })
                        }
                        defaultChecked={viewForm.manageCapital}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Employee</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageEmployee: !viewForm.manageEmployee,
                          })
                        }
                        defaultChecked={viewForm.manageEmployee}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Payments</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            managePayments: !viewForm.managePayments,
                          })
                        }
                        defaultChecked={viewForm.managePayments}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Expense</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageExpense: !viewForm.manageExpense,
                          })
                        }
                        defaultChecked={viewForm.manageExpense}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Product</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageProduct: !viewForm.manageProduct,
                          })
                        }
                        defaultChecked={viewForm.manageProduct}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Production</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageProduction: !viewForm.manageProduction,
                          })
                        }
                        defaultChecked={viewForm.manageProduction}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Purchase</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            managePurchase: !viewForm.managePurchase,
                          })
                        }
                        defaultChecked={viewForm.managePurchase}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Raw Material</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageRawMaterial: !viewForm.manageRawMaterial,
                          })
                        }
                        defaultChecked={viewForm.manageRawMaterial}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Salary</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageSalary: !viewForm.manageSalary,
                          })
                        }
                        defaultChecked={viewForm.manageSalary}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Sale</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageSale: !viewForm.manageSale,
                          })
                        }
                        defaultChecked={viewForm.manageSale}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Manage Users</td>
                    <td>
                      <Form.Check
                        onChange={() =>
                          setViewForm({
                            ...viewForm,
                            manageUsers: !viewForm.manageUsers,
                          })
                        }
                        defaultChecked={viewForm.manageUsers}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button onClick={() => updateRoles(viewModalId)}>
                Update Access
              </Button>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
