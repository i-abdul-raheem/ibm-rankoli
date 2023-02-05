import { useEffect, useState } from "react";
import { Container, Card, Table, Button } from "react-bootstrap";

export default function Inventory(props) {
  const [sales, setSales] = useState([]);
  const [productions, setProductions] = useState([]);
  const [products, setProducts] = useState([]);
  const [myInventory, setMyInventory] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const updateSales = async () => {
    const res = await fetch("http://localhost:5000/sales").then((res) =>
      res.json()
    );
    setSales(res.data);
  };
  const updateProductions = async () => {
    const res = await fetch("http://localhost:5000/productions").then((res) =>
      res.json()
    );
    const temp = [];
    res.data.map((i) => {
      if (i.finished === true) {
        temp.push(i);
      }
    });
    setProductions(res.data);
  };
  const updateProducts = async () => {
    const res = await fetch("http://localhost:5000/products").then((res) =>
      res.json()
    );
    setProducts(res.data);
  };
  const setup = () => {
    const myPros = [];
    productions.map((i) => myPros.push(i.product));
    const mySales = [];
    sales.map((i) => mySales.push(i.products));
    const myProds = [];
    products.map((i) => myProds.push(i.title));
    let prosCount = 0;
    let salesCount = 0;
    const arr = [];
    for (let i = 0; i < myProds.length; i++) {
      myPros.map((j) => {
        if (j.title === myProds[i]) {
          prosCount += parseInt(j.amount);
        }
      });
      mySales.map((j) => {
        if (j.title === myProds[i]) {
          salesCount += parseInt(j.quantity);
        }
      });
      arr.push({
        title: myProds[i],
        qty: prosCount - salesCount,
      });
    }
    setMyInventory(arr);
  };
  useEffect(() => {
    updateProductions();
    updateSales();
    updateProducts();
    setup();
  });
  return (
    <>
      <Container>
        <Card>
          <Card.Header className="title-btn">
            <span>Finished Goods</span>
            <Button onClick={() => setRefresh(!refresh)}>
              <i className="fa fa-refresh"></i>
            </Button>
          </Card.Header>
          <Card.Body>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {myInventory.map((i, index) => (
                  <tr key={`inventory-${index}`}>
                    <td>{i.title}</td>
                    <td>{i.qty}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
