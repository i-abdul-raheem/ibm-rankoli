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

export default function ManageProduction(props) {
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [viewModalId, setViewModalId] = useState("1");
  const [accounts, setAccounts] = useState([]);
  const [rawMaterial, setRawMaterial] = useState([]);
  const [inventory, setInventory] = useState({
    title: "",
    quantity: "",
  });
  const [purchases, setPurchases] = useState([]);
  const [expense, setExpense] = useState({
    title: "",
    cost: "",
  });
  const [viewForm, setViewForm] = useState({
    _id: "0",
    product: {
      title: "nill",
      amount: "nill",
    },
    rawMaterials: [],
    expenses: [],
  });
  const [updateForm, setUpdateForm] = useState({
    _id: "0",
    product: {
      title: "nill",
      amount: "nill",
    },
    rawMaterials: [],
    expenses: [],
  });
  const [productions, setProductions] = useState([]);
  const [form, setForm] = useState({
    product: {
      title: "",
      amount: "",
    },
    rawMaterials: [],
    expenses: [],
  });
  const getAveragePrice = (title) => {
    const temp = [];
    purchases.map((i) => {
      i.map((j) => {
        if (j.title === title) temp.push(j);
      });
    });
    let qty = 0;
    let cost = 0;
    temp.map((i) => {
      qty += parseInt(i.quantity);
      cost += parseInt(i.quantity) * parseInt(i.cost);
    });
    return parseFloat(cost / qty);
  };
  const finishProduction = async (id) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `http://localhost:5000/productions/${id}/finish`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    await updateProductions();
  };
  const updateAccounts = async () => {
    const res = await fetch("http://localhost:5000/products").then((res) =>
      res.json()
    );
    setAccounts(res.data);
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
    const temp = [];
    res.data.map((i) => temp.push(i.rawMaterials));
    setPurchases(temp);
  };
  const updateProductions = async () => {
    const res = await fetch("http://localhost:5000/productions").then((res) =>
      res.json()
    );
    const temp = [];
    res.data.map((i) => {
      if (i.finished === false) temp.push(i);
    });
    setProductions(temp);
  };
  const handleUpdateRequest = async (e) => {
    e.preventDefault();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateForm),
    };
    const res = await fetch(
      `http://localhost:5000/productions/${updateForm._id}`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    await updateProductions();
    setUpdateModal(false);
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
    const res = await fetch("http://localhost:5000/productions", options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
    updateProductions();
    setAddModal(false);
  };
  const setViewFormFields = async () => {
    const res = await fetch(
      `http://localhost:5000/productions/${viewModalId}`
    ).then((res) => res.json());
    setViewForm(res.data);
  };
  useEffect(() => {
    updateProductions();
    updateAccounts();
    updateRawMaterials();
    updatePurchases();
  }, []);
  useEffect(() => {
    setViewFormFields();
  }, [viewModalId]);
  let totalExpense = 0;
  let totalMaterialCost = 0;
  return (
    <Container>
      <Card>
        <Card.Header>Manage Productions</Card.Header>
        <Card.Body>
          <Card.Title className="mb-3">
            <Button variant="primary" onClick={() => setAddModal(true)}>
              Add Production
            </Button>
          </Card.Title>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Production #</th>
                <th>View</th>
                <th>Update</th>
                <th>Finish</th>
              </tr>
            </thead>
            <tbody>
              {productions.map((i, index) => (
                <tr key={`${index}-acconut-index`}>
                  <td>{index + 1}</td>
                  <td>{i.product.title}</td>
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
                  <td>
                    <Button
                      onClick={() => {
                        setUpdateForm(i);
                        setUpdateModal(true);
                      }}
                    >
                      <i className="fa fa-edit"></i>
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        setViewModalId(i._id);
                        finishProduction(i._id);
                      }}
                    >
                      <i className="fa fa-check"></i>
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
          {`Production # ${viewForm._id}`}
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Header>Production # {viewForm._id}</Card.Header>
            <Card.Body>
              <Card className="mb-3">
                <Card.Header>Product Info</Card.Header>
                <Card.Body>
                  <Table>
                    <tbody>
                      <tr>
                        <th>Product Name</th>
                        <td>{viewForm.product.title}</td>
                      </tr>
                      <tr>
                        <th>Quantity</th>
                        <td>{viewForm.product.amount}</td>
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
                      </tr>
                    </thead>
                    <tbody>
                      {viewForm.rawMaterials.map((i, index) => {
                        totalMaterialCost +=
                          parseInt(i.quantity) * getAveragePrice(i.title);
                        return (
                          <tr key={`rawMaterial-production-item-${index}`}>
                            <td>{i.title}</td>
                            <td>{i.quantity}</td>
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
                          <tr
                            key={`rawMaterial-expense-production-item-${index}`}
                          >
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
            <Card.Footer>
              Total Cost: {totalMaterialCost + totalExpense}
            </Card.Footer>
          </Card>
        </Modal.Body>
      </Modal>
      <Modal show={addModal} fullscreen>
        <Modal.Header onHide={() => setAddModal(false)} closeButton>
          Add Production
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form onSubmit={handleAddRequest}>
                <Card className="mb-3">
                  <Card.Header>Product Details</Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Product</Form.Label>
                      <Form.Select
                        value={form.product.title}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            product: { ...form.product, title: e.target.value },
                          })
                        }
                        required
                      >
                        <option value="">Select Product...</option>
                        {accounts.map((i, index) => (
                          <option
                            key={`production-product-${index}`}
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
                        value={form.product.amount}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            product: {
                              ...form.product,
                              amount: e.target.value,
                            },
                          })
                        }
                        placeholder="Enter Quantity"
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
                            key={`production-product-${index}`}
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
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.rawMaterials.map((i, index) => (
                        <tr key={`${index}-inventory-list-item`}>
                          <td>{i.title}</td>
                          <td>{i.quantity}</td>
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
                <Button type="submit">Start Production</Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
      <Modal show={updateModal} fullscreen>
        <Modal.Header onHide={() => setUpdateModal(false)} closeButton>
          Update Production
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form onSubmit={handleUpdateRequest}>
                <Card className="mb-3">
                  <Card.Header>Product Details</Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Product</Form.Label>
                      <Form.Control
                        type="text"
                        value={updateForm.product.title}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        value={updateForm.product.amount}
                        placeholder="Enter Quantity"
                        readOnly
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
                      >
                        <option value="">Select Raw Material...</option>
                        {rawMaterial.map((i, index) => (
                          <option
                            key={`production-product-${index}`}
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
                      />
                    </Form.Group>
                    <Button
                      onClick={() => {
                        setUpdateForm({
                          ...updateForm,
                          rawMaterials: [...updateForm.rawMaterials, inventory],
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
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {updateForm.rawMaterials.map((i, index) => (
                        <tr key={`${index}-inventory-list-item`}>
                          <td>{i.title}</td>
                          <td>{i.quantity}</td>
                          <td>
                            <Button
                              onClick={() => {
                                const temp = updateForm.rawMaterials;
                                temp.splice(index, 1);
                                setUpdateForm({
                                  ...updateForm,
                                  rawMaterials: temp,
                                });
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
                      />
                    </Form.Group>
                    <Button
                      onClick={() => {
                        setUpdateForm({
                          ...updateForm,
                          expenses: [...updateForm.expenses, expense],
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
                      {updateForm.expenses.map((i, index) => (
                        <tr key={`${index}-inventory-list-item`}>
                          <td>{i.title}</td>
                          <td>{i.cost}</td>
                          <td>
                            <Button
                              onClick={() => {
                                const temp = updateForm.expenses;
                                temp.splice(index, 1);
                                setUpdateForm({
                                  ...updateForm,
                                  expenses: temp,
                                });
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
                <Button type="submit">Update Production</Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
