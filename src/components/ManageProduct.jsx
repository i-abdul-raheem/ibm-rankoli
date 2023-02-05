import { useEffect, useState } from "react";
import { Card, Button, Container, Table, Modal, Form } from "react-bootstrap";

export default function ManageProduct(props) {
  const [addModal, setAddModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
  });
  const updateProducts = async () => {
    const res = await fetch("http://localhost:5000/products").then((res) =>
      res.json()
    );
    setProducts(res.data);
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
    const res = await fetch("http://localhost:5000/products", options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
    updateProducts();
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
      `http://localhost:5000/products/${id}`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    updateProducts();
  };
  useEffect(() => {
    updateProducts();
  }, []);
  return (
    <Container>
      <Card>
        <Card.Header>Manage Products</Card.Header>
        <Card.Body>
          <Card.Title className="mb-3">
            <Button variant="primary" onClick={() => setAddModal(true)}>
              Add Product
            </Button>
          </Card.Title>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((i, index) => (
                <tr key={`${index}-acconut-index`}>
                  <td>{index + 1}</td>
                  <td>{i.title}</td>
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
          Add Product
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form onSubmit={handleAddRequest}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
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
                <Button type="submit">Add</Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
