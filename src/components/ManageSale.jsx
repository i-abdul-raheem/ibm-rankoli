import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Container,
  Table,
  Modal,
  Form,
  Tab,
} from "react-bootstrap";

export default function ManageSale(props) {
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewModalId, setViewModalId] = useState("1");
  const [accounts, setAccounts] = useState([]);
  const [rawMaterial, setRawMaterial] = useState([]);
  const [inventory, setInventory] = useState({
    title: "",
    quantity: "",
    cost: "",
  });
  const [expense, setExpense] = useState({
    title: "",
    cost: "",
  });
  const [viewForm, setViewForm] = useState({
    _id: "0",
    customer: {
      title: "nill",
      amount: "nill",
    },
    products: [],
    expenses: [],
  });
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    customer: {
      title: "",
      amount: "",
    },
    products: [],
    expenses: [],
  });
  const updateAccounts = async () => {
    const res = await fetch("http://localhost:5000/accounts").then((res) =>
      res.json()
    );
    const temp = [];
    res.data.map((i) => {
      if (i.accountType === "customer") temp.push(i);
    });
    setAccounts(temp);
  };
  const updateProducts = async () => {
    const res = await fetch("http://localhost:5000/products").then((res) =>
      res.json()
    );
    setRawMaterial(res.data);
  };
  const updateSales = async () => {
    const res = await fetch("http://localhost:5000/sales").then((res) =>
      res.json()
    );
    setSales(res.data);
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
    const res = await fetch("http://localhost:5000/sales", options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
    updateSales();
    setAddModal(false);
  };
  const setViewFormFields = async () => {
    const res = await fetch(
      `http://localhost:5000/sales/${viewModalId}`
    ).then((res) => res.json());
    setViewForm(res.data);
  };
  useEffect(() => {
    updateSales();
    updateAccounts();
    updateProducts();
  }, []);
  useEffect(() => {
    setViewFormFields();
  }, [viewModalId]);
  let totalExpense = 0;
  let totalMaterialCost = 0;
  return (
    <Container>
      <Card>
        <Card.Header>Manage Sales</Card.Header>
        <Card.Body>
          <Card.Title className="mb-3">
            <Button variant="primary" onClick={() => setAddModal(true)}>
              Add Sale
            </Button>
          </Card.Title>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Invoice #</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((i, index) => (
                <tr key={`${index}-acconut-index`}>
                  <td>{index + 1}</td>
                  <td>{i.customer.title}</td>
                  <td>{i._id}</td>
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
          {`Invoice # ${viewForm._id}`}
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Header>Invoice # {viewForm._id}</Card.Header>
            <Card.Body>
              <Card className="mb-3">
                <Card.Header>Customer Info</Card.Header>
                <Card.Body>
                  <Table>
                    <tbody>
                      <tr>
                        <th>Customer Name</th>
                        <td>{viewForm.customer.title}</td>
                      </tr>
                      <tr>
                        <th>Amount Paid</th>
                        <td>{viewForm.customer.amount}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Header>Product</Card.Header>
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <td>QTY</td>
                        <td>Unit Cost</td>
                      </tr>
                    </thead>
                    <tbody>
                      {viewForm.products.map((i, index) => {
                        totalMaterialCost += parseInt(i.cost) * parseInt(i.quantity);
                        return (
                          <tr key={`rawMaterial-invoice-item-${index}`}>
                            <td>{i.title}</td>
                            <td>{i.quantity}</td>
                            <td>{i.cost}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Header>Expenses</Card.Header>
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <td>Cost</td>
                      </tr>
                    </thead>
                    <tbody>
                      {viewForm.expenses.map((i, index) => {
                        totalExpense += parseInt(i.cost);
                        return (
                          <tr key={`rawMaterial-expense-invoice-item-${index}`}>
                            <td>{i.title}</td>
                            <td>{i.cost}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Card.Body>
            <Card.Footer>Total: {totalMaterialCost + totalExpense}</Card.Footer>
          </Card>
        </Modal.Body>
      </Modal>
      <Modal show={addModal} fullscreen>
        <Modal.Header onHide={() => setAddModal(false)} closeButton>
          Add Sale
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form onSubmit={handleAddRequest}>
                <Card className="mb-3">
                  <Card.Header>Customer Details</Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Customer</Form.Label>
                      <Form.Select
                        value={form.customer.title}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            customer: { ...form.customer, title: e.target.value },
                          })
                        }
                        required
                      >
                        <option value="">Select Customer...</option>
                        {accounts.map((i, index) => (
                          <option
                            key={`sale-customer-${index}`}
                            value={i.title}
                          >
                            {i.title}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="number"
                        value={form.customer.amount}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            customer: { ...form.customer, amount: e.target.value },
                          })
                        }
                        placeholder="Enter Amount Paid"
                        required
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Header>Product</Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Title</Form.Label>
                      <Form.Select
                        value={inventory.title}
                        onChange={(e) =>
                          setInventory({
                            ...inventory,
                            title: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select Product...</option>
                        {rawMaterial.map((i, index) => (
                          <option
                            key={`sale-customer-${index}`}
                            value={i.title}
                          >
                            {i.title}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        value={inventory.quantity}
                        onChange={(e) =>
                          setInventory({
                            ...inventory,
                            quantity: e.target.value,
                          })
                        }
                        placeholder="Enter Quantity"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Unit Cost</Form.Label>
                      <Form.Control
                        type="number"
                        value={inventory.cost}
                        onChange={(e) =>
                          setInventory({
                            ...inventory,
                            cost: e.target.value,
                          })
                        }
                        placeholder="Enter Cost"
                        required
                      />
                    </Form.Group>
                    <Button
                      onClick={() => {
                        setForm({
                          ...form,
                          products: [...form.products, inventory],
                        });
                      }}
                    >
                      Add Product
                    </Button>
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.products.map((i, index) => (
                        <tr key={`${index}-inventory-list-item`}>
                          <td>{i.title}</td>
                          <td>{i.quantity}</td>
                          <td>{i.cost}</td>
                          <td>
                            <Button
                              onClick={() => {
                                const temp = form.products;
                                temp.splice(index, 1);
                                setForm({ ...form, products: temp });
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
                <Card className="mb-3">
                  <Card.Header>Expense</Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Expense Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Expense Title"
                        value={expense.title}
                        onChange={(e) =>
                          setExpense({
                            ...expense,
                            title: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Cost</Form.Label>
                      <Form.Control
                        type="number"
                        value={expense.cost}
                        onChange={(e) =>
                          setExpense({
                            ...expense,
                            cost: e.target.value,
                          })
                        }
                        placeholder="Enter Cost"
                        required
                      />
                    </Form.Group>
                    <Button
                      onClick={() => {
                        setForm({
                          ...form,
                          expenses: [...form.expenses, expense],
                        });
                      }}
                    >
                      Add Expense
                    </Button>
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Expense</th>
                        <th>Cost</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.expenses.map((i, index) => (
                        <tr key={`${index}-inventory-list-item`}>
                          <td>{i.title}</td>
                          <td>{i.cost}</td>
                          <td>
                            <Button
                              onClick={() => {
                                const temp = form.expenses;
                                temp.splice(index, 1);
                                setForm({ ...form, expenses: temp });
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
                <Button type="submit">Add</Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
