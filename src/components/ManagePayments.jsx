import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

export default function ManagePayments(props) {
  const [sales, setSales] = useState([]);
  const [receiveable, setReceiveable] = useState(0);
  const [payable, setPayable] = useState(0);
  const [purchases, setPurchases] = useState([]);
  const [formPayable, setFormPayable] = useState({
    id: "0",
    amount: 0,
  });
  const [formReceiveable, setFormReceiveable] = useState({
    id: "0",
    amount: 0,
  });
  const [myId, setMyId] = useState(0);
  const setTotalReceiveable = (index) => {
    const products = sales[index].products;
    const expenses = sales[index].expenses;
    let totalOfProduct = 0;
    let totalOfExpense = 0;
    products.map((i) => {
      totalOfProduct += parseInt(i.cost) * parseInt(i.quantity);
    });
    expenses.map((i) => {
      totalOfExpense += parseInt(i.cost);
    });
    setReceiveable(
      totalOfExpense + totalOfProduct - sales[index].customer.amount
    );
  };
  const setTotalPayable = (index) => {
    const rawMaterials = purchases[index].rawMaterials;
    const expenses = purchases[index].expenses;
    let totalOfProduct = 0;
    let totalOfExpense = 0;
    rawMaterials.map((i) => {
      totalOfProduct += parseInt(i.cost) * parseInt(i.quantity);
    });
    expenses.map((i) => {
      totalOfExpense += parseInt(i.cost);
    });
    setPayable(
      totalOfExpense + totalOfProduct - purchases[index].vendor.amount
    );
  };
  const updateSales = async () => {
    const res = await fetch(`http://localhost:5000/sales`).then((res) =>
      res.json()
    );
    setSales(res.data);
  };
  const updatePurchases = async () => {
    const res = await fetch(`http://localhost:5000/purchases`).then((res) =>
      res.json()
    );
    setPurchases(res.data);
  };
  const updateReceiveable = async (e) => {
    e.preventDefault();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formReceiveable),
    };
    const res = await fetch(
      `http://localhost:5000/sales/payment/${myId}`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    setFormReceiveable({
      id: "0",
      amount: 0,
    });
    setReceiveable(0);
    updateSales();
  };
  const updatePayable = async (e) => {
    e.preventDefault();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formPayable),
    };
    const res = await fetch(
      `http://localhost:5000/purchases/payment/${myId}`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    setFormPayable({
      id: "0",
      amount: 0,
    });
    setPayable(0);
    updatePurchases();
  };
  useEffect(() => {
    updateSales();
    updatePurchases();
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <Card className="mb-3">
              <Card.Header>Receive Payment</Card.Header>
              <Card.Body>
                <Form onSubmit={updateReceiveable}>
                  <Form.Group className="mb-3">
                    <Form.Label>Invoice</Form.Label>
                    <Form.Select>
                      <option value="">Select Invoice...</option>
                      {sales.map((i, index) => (
                        <option
                          key={`receive-invoice-${index}`}
                          id={index}
                          value={i._id}
                          onClick={(e) => {
                            setTotalReceiveable(e.target.id);
                            setMyId(i._id);
                          }}
                        >
                          {i.customer.title} - {i._id}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Receiveable: {receiveable}</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Amount Received</Form.Label>
                    <Form.Control
                      value={formReceiveable.amount}
                      onChange={(e) =>
                        setFormReceiveable({
                          ...formReceiveable,
                          amount: e.target.value,
                        })
                      }
                      type="number"
                      placeholder="Amount Received"
                    />
                  </Form.Group>
                  <Button type="submit">Update</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6}>
            <Card className="mb-3">
              <Card.Header>Pay Payment</Card.Header>
              <Card.Body>
                <Form onSubmit={updatePayable}>
                  <Form.Group className="mb-3">
                    <Form.Label>Invoice</Form.Label>
                    <Form.Select>
                      <option value="">Select Invoice...</option>
                      {purchases.map((i, index) => (
                        <option
                          key={`pay-invoice-${index}`}
                          id={index}
                          value={i._id}
                          onClick={(e) => {
                            setTotalPayable(e.target.id);
                            setMyId(i._id);
                          }}
                        >
                          {i.vendor.title} - {i._id}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Payable: {payable}</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Amount Paid</Form.Label>
                    <Form.Control
                      value={formPayable.amount}
                      onChange={(e) =>
                        setFormPayable({
                          ...formPayable,
                          amount: e.target.value,
                        })
                      }
                      type="number"
                      placeholder="Amount Paid"
                    />
                  </Form.Group>
                  <Button type="submit">Update</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
