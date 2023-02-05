import { useEffect, useState } from "react";
import { Card, Button, Container, Table, Modal, Form } from "react-bootstrap";

export default function ManageEmployee(props) {
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewModalId, setViewModalId] = useState("1");
  const [viewForm, setViewForm] = useState({
    title: "nill",
    address: "nill",
    contact: "nill",
    email: "nill",
    salary: "nill",
    cnic: "nill",
    employeeType: "nill",
  });
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: "",
    address: "",
    contact: "",
    email: "",
    employeeType: "",
    salary: 0,
    cnic: "",
  });
  const updateEmployees = async () => {
    const res = await fetch("http://localhost:5000/employees").then((res) =>
      res.json()
    );
    setEmployees(res.data);
  };
  const handleAddRequest = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };
    const res = await fetch("http://localhost:5000/employees", options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
    updateEmployees();
    setAddModal(false);
  };
  const setViewFormFields = async () => {
    const res = await fetch(`http://localhost:5000/employees/${viewModalId}`).then((res) =>
      res.json()
    );
    setViewForm(res.data);
  }
  useEffect(() => {
    updateEmployees();
  }, []);
  useEffect(() => {
    setViewFormFields();
  }, [viewModalId])
  return (
    <Container>
      <Card>
        <Card.Header>Manage Employees</Card.Header>
        <Card.Body>
          <Card.Title className="mb-3">
            <Button variant="primary" onClick={() => setAddModal(true)}>
              Add Employee
            </Button>
          </Card.Title>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Name</th>
                <th>Employee Type</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((i, index) => (
                <tr key={`${index}-acconut-index`}>
                  <td>{index + 1}</td>
                  <td>{i.title}</td>
                  <td>{i.employeeType}</td>
                  <td>
                    <Button
                      onClick={() => {
                        setViewModalId(i._id);
                        setViewModal(true);
                      }}
                    >
                      <i className="fa fa-eye"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={viewModal} fullscreen>
        <Modal.Header onHide={() => setViewModal(false)} closeButton>
          {viewForm.title}
        </Modal.Header>
        <Modal.Body>
          <div className="viewer">
            <section className="info">
              <Card>
                <Card.Header>Employee Information</Card.Header>
                <Card.Body>
                  <Table>
                    <tbody>
                      <tr>
                        <th>Employee Type</th>
                        <td>{viewForm.employeeType}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>{viewForm.address}</td>
                      </tr>
                      <tr>
                        <th>Email Address</th>
                        <td>{viewForm.email}</td>
                      </tr>
                      <tr>
                        <th>CNIC</th>
                        <td>{viewForm.cnic}</td>
                      </tr>
                      <tr>
                        <th>Salary</th>
                        <td>{viewForm.salary}</td>
                      </tr>
                      <tr>
                        <th>Contact Number</th>
                        <td>{viewForm.contact}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </section>
            <section className="ledgers">
              <Card>
                <Card.Header>Ledgers</Card.Header>
                <Card.Body>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Particular</th>
                        <th>Date</th>
                        <th>Employee</th>
                        <th>DR</th>
                        <th>CR</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Salary</th>
                        <th>Dec 1, 2021</th>
                        <th>Salary</th>
                        <th>20000</th>
                        <th>0</th>
                        <th>20000</th>
                      </tr>
                      <tr>
                        <th>Receiveable</th>
                        <th>Jan 1, 2023</th>
                        <th>Receiveable</th>
                        <th>20000</th>
                        <th>0</th>
                        <th>20000</th>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </section>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={addModal} fullscreen>
        <Modal.Header onHide={() => setAddModal(false)} closeButton>
          Add Employee
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form onSubmit={handleAddRequest}>
                <Form.Group className="mb-3">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Enter Employee Name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Enter Email"
                    
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.contact}
                    onChange={(e) =>
                      setForm({ ...form, contact: e.target.value })
                    }
                    placeholder="Enter Contact Number"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>CNIC</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.cnic}
                    onChange={(e) =>
                      setForm({ ...form, cnic: e.target.value })
                    }
                    placeholder="Enter CNIC"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    placeholder="Enter Address"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    value={form.salary}
                    onChange={(e) =>
                      setForm({ ...form, salary: e.target.value })
                    }
                    placeholder="Enter Salary"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Employee Type</Form.Label>
                  <Form.Select
                    value={form.employeeType}
                    onChange={(e) =>
                      setForm({ ...form, employeeType: e.target.value })
                    }
                    required
                  >
                    <option value="">Select employee type...</option>
                    <option value="accounts">Accounts</option>
                    <option value="human resource">Human Resource</option>
                    <option value="sales">Sales</option>
                    <option value="production">Production</option>
                    <option value="procurement">Procurement</option>
                    <option value="admin">Admin</option>
                    <option value="labor">Labor</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit">Add</Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
