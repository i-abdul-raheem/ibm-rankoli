import { useEffect, useState } from "react";
import { Card, Button, Container, Table, Modal, Form } from "react-bootstrap";

export default function ManageExpense(props) {
  const [addModal, setAddModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
  });
  const updateExpenses = async () => {
    const res = await fetch("http://localhost:5000/expenses").then((res) =>
      res.json()
    );
    setExpenses(res.data);
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
    const res = await fetch("http://localhost:5000/expenses", options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
    updateExpenses();
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
      `http://localhost:5000/expenses/${id}`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    updateExpenses();
  };
  useEffect(() => {
    updateExpenses();
    updateAccounts();
  }, []);
  return (
    <Container>
      <Card>
        <Card.Header>Manage Expenses</Card.Header>
        <Card.Body>
          <Card.Title className="mb-3">
            <Button variant="primary" onClick={() => setAddModal(true)}>
              Add Expense
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
              {expenses.map((i, index) => (
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
          Add Expense
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form onSubmit={handleAddRequest}>
                <Form.Group className="mb-3">
                  <Form.Label>Expense Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Enter Title"
                    required
                  />
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
