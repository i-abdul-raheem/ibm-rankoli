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

export default function ManagePurchase(props) {
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
    vendor: {
      title: "nill",
      amount: "nill",
    },
    rawMaterials: [],
    expenses: [],
  });
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState({
    vendor: {
      title: "",
      amount: "",
    },
    rawMaterials: [],
    expenses: [],
  });
  const updateAccounts = async () => {
    const res = await fetch("http://localhost:5000/accounts").then((res) =>
      res.json()
    );
    const temp = [];
    res.data.map((i) => {
      if (i.accountType === "vendor") temp.push(i);
    });
    setAccounts(temp);
  };
  const updateRawMaterials = async () => {
    const res = await fetch("http://localhost:5000/rawMaterials").then((res) =>
      res.json()
    );
    setRawMaterial(res.data);
  };
  const updatePurchases = async () => {
    const res = await fetch("http://localhost:5000/purchases").then((res) =>
      res.json()
    );
    setPurchases(res.data);
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
    const res = await fetch("http://localhost:5000/purchases", options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
    updatePurchases();
    setAddModal(false);
  };
  const setViewFormFields = async () => {
    const res = await fetch(
      `http://localhost:5000/purchases/${viewModalId}`
    ).then((res) => res.json());
    setViewForm(res.data);
  };
  useEffect(() => {
    updatePurchases();
    updateAccounts();
    updateRawMaterials();
  }, []);
  useEffect(() => {
    setViewFormFields();
  }, [viewModalId]);
  let totalExpense = 0;
  let totalMaterialCost = 0;
  return (
    <Container>
      <Card>
        <Card.Header>Manage Purchases</Card.Header>
        <Card.Body>
          <Card.Title className="mb-3">
            <Button variant="primary" onClick={() => setAddModal(true)}>
              Add Purchase
            </Button>
          </Card.Title>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Vendor</th>
                <th>Invoice #</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((i, index) => (
                <tr key={`${index}-acconut-index`}>
                  <td>{index + 1}</td>
                  <td>{i.vendor.title}</td>
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
                <Card.Header>Vendor Info</Card.Header>
                <Card.Body>
                  <Table>
                    <tbody>
                      <tr>
                        <th>Vendor Name</th>
                        <td>{viewForm.vendor.title}</td>
                      </tr>
                      <tr>
                        <th>Amount Paid</th>
                        <td>{viewForm.vendor.amount}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Header>Raw Material</Card.Header>
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
                      {viewForm.rawMaterials.map((i, index) => {
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
          Add Purchase
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form onSubmit={handleAddRequest}>
                <Card className="mb-3">
                  <Card.Header>Vendor Details</Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Vendor</Form.Label>
                      <Form.Select
                        value={form.vendor.title}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            vendor: { ...form.vendor, title: e.target.value },
                          })
                        }
                        required
                      >
                        <option value="">Select Vendor...</option>
                        {accounts.map((i, index) => (
                          <option
                            key={`purchase-vendor-${index}`}
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
                        value={form.vendor.amount}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            vendor: { ...form.vendor, amount: e.target.value },
                          })
                        }
                        placeholder="Enter Amount Paid"
                        required
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Header>Raw Material</Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Raw Material Title</Form.Label>
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
                        <option value="">Select Raw Material...</option>
                        {rawMaterial.map((i, index) => (
                          <option
                            key={`purchase-vendor-${index}`}
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
                          rawMaterials: [...form.rawMaterials, inventory],
                        });
                      }}
                    >
                      Add Raw Material
                    </Button>
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Raw Material</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.rawMaterials.map((i, index) => (
                        <tr key={`${index}-inventory-list-item`}>
                          <td>{i.title}</td>
                          <td>{i.quantity}</td>
                          <td>{i.cost}</td>
                          <td>
                            <Button
                              onClick={() => {
                                const temp = form.rawMaterials;
                                temp.splice(index, 1);
                                setForm({ ...form, rawMaterials: temp });
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
