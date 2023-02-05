import { useEffect, useState } from "react";
import { Card, Button, Container, Table, Modal, Form } from "react-bootstrap";

export default function ManageAccount(props) {
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewModalId, setViewModalId] = useState("1");
  const [viewForm, setViewForm] = useState({
    title: "nill",
    address: "nill",
    contact: "nill",
    email: "nill",
    accountType: "nill",
  });
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    address: "",
    contact: "",
    email: "",
    accountType: "",
  });
  const updateAccounts = async () => {
    const res = await fetch("http://localhost:5000/accounts").then((res) =>
      res.json()
    );
    setAccounts(res.data);
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
    const res = await fetch("http://localhost:5000/accounts", options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
    updateAccounts();
    setAddModal(false);
  };
  const setViewFormFields = async () => {
    const res = await fetch(`http://localhost:5000/accounts/${viewModalId}`).then((res) =>
      res.json()
    );
    setViewForm(res.data);
  }
  useEffect(() => {
    updateAccounts();
  });
  useEffect(() => {
    setViewFormFields();
  }, [viewModalId])
  return (
    <Container>
      <Card>
        <Card.Header>Manage Accounts</Card.Header>
        <Card.Body>
          <Card.Title className="mb-3">
            <Button variant="primary" onClick={() => setAddModal(true)}>
              Add Account
            </Button>
          </Card.Title>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Account Title</th>
                <th>Account Type</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((i, index) => (
                <tr key={`${index}-acconut-index`}>
                  <td>{index + 1}</td>
                  <td>{i.title}</td>
                  <td>{i.accountType}</td>
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
                <Card.Header>Account Information</Card.Header>
                <Card.Body>
                  <Table>
                    <tbody>
                      <tr>
                        <th>Account Type</th>
                        <td>{viewForm.accountType}</td>
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
                        <th>Account</th>
                        <th>DR</th>
                        <th>CR</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Account Receiveable</th>
                        <th>Jan 23, 2023</th>
                        <th>Receiveable</th>
                        <th>20000</th>
                        <th>0</th>
                        <th>20000</th>
                      </tr>
                      <tr>
                        <th>Account Receiveable</th>
                        <th>Jan 28, 2023</th>
                        <th>Receiveable</th>
                        <th>0</th>
                        <th>20000</th>
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
          Add Account
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form onSubmit={handleAddRequest}>
                <Form.Group className="mb-3">
                  <Form.Label>Account Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Enter Account Title"
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
                    required
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
                  <Form.Label>Account Type</Form.Label>
                  <Form.Select
                    value={form.accountType}
                    onChange={(e) =>
                      setForm({ ...form, accountType: e.target.value })
                    }
                    required
                  >
                    <option value="">Select account type...</option>
                    <option value="customer">Customer</option>
                    <option value="investor">Investor</option>
                    <option value="vendor">Vendor</option>
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
