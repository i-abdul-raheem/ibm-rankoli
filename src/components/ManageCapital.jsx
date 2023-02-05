import { useEffect, useState } from "react";
import { Card, Button, Container, Table, Modal, Form } from "react-bootstrap";

export default function ManageCapital(props) {
  const [addModal, setAddModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [capitals, setCapitals] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
  });
  const updateCapitals = async () => {
    const res = await fetch("http://localhost:5000/capitals").then((res) =>
      res.json()
    );
    setCapitals(res.data);
  };
  const updateAccounts = async () => {
    const res = await fetch("http://localhost:5000/accounts").then((res) =>
      res.json()
    );
    const temp = [];
    res.data.map((i) => {
      if (i.accountType === "investor") temp.push(i);
    });
    setAccounts(temp);
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
    const res = await fetch("http://localhost:5000/capitals", options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
    updateCapitals();
    setAddModal(false);
  };
  const handleDelete = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `http://localhost:5000/capitals/${id}`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    updateCapitals();
  };
  useEffect(() => {
    updateCapitals();
    updateAccounts();
  }, []);
  return (
    <Container>
      <Card>
        <Card.Header>Manage Capitals</Card.Header>
        <Card.Body>
          <Card.Title className="mb-3">
            <Button variant="primary" onClick={() => setAddModal(true)}>
              Add Capital
            </Button>
          </Card.Title>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Account Title</th>
                <th>Amonut</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {capitals.map((i, index) => (
                <tr key={`${index}-acconut-index`}>
                  <td>{index + 1}</td>
                  <td>{i.title}</td>
                  <td>{i.amount}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDelete(i._id);
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={addModal} fullscreen>
        <Modal.Header onHide={() => setAddModal(false)} closeButton>
          Add Capital
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form onSubmit={handleAddRequest}>
                <Form.Group className="mb-3">
                  <Form.Label>Account</Form.Label>
                  <Form.Select
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  >
                    <option value="">Select account...</option>
                    {accounts.map((i, index) => (
                      <option key={`${index}-accounts-capital`} value={i.title}>
                        {i.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    placeholder="Enter Amount"
                    required
                  />
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
