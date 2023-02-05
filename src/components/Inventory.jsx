import { useEffect, useState } from "react";
import { Container, Card, Table, Button } from "react-bootstrap";

export default function Inventory(props) {
  const [purchases, setPurchases] = useState([]);
  const [productions, setProductions] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [myInventory, setMyInventory] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const updatePurchases = async () => {
    const res = await fetch("http://localhost:5000/purchases").then((res) =>
      res.json()
    );
    setPurchases(res.data);
  };
  const updateProductions = async () => {
    const res = await fetch("http://localhost:5000/productions").then((res) =>
      res.json()
    );
    setProductions(res.data);
  };
  const updateRawMaterials = async () => {
    const res = await fetch("http://localhost:5000/rawMaterials").then((res) =>
      res.json()
    );
    setRawMaterials(res.data);
  };
  const getMyPurchases = () => {
    const rawMaterialsPurchases = [];
    purchases.map((i) => {
      i.rawMaterials.map((j) => rawMaterialsPurchases.push(j));
    });
    return rawMaterialsPurchases;
  };
  const getMyProductions = () => {
    const rawMaterialsProductions = [];
    productions.map((i) => {
      i.rawMaterials.map((j) => rawMaterialsProductions.push(j));
    });
    return rawMaterialsProductions;
  };
  const getMyTitles = () => {
    const titles = [];
    rawMaterials.map((i) => titles.push(i.title));
    return titles;
  };
  const inventorySetup = () => {
    const titles = getMyTitles();
    const purs = getMyPurchases();
    const pros = getMyProductions();
    const arr = [];
    titles.map((i) => {
      let pursQty = 0;
      let prosQty = 0;
      for (let j = 0; j < purs.length; j++) {
        if (purs[j].title == i) {
          pursQty += parseInt(purs[j].quantity);
        }
      }
      for (let j = 0; j < pros.length; j++) {
        if (pros[j].title == i) {
          prosQty += parseInt(pros[j].quantity);
        }
      }
      arr.push({
        title: i,
        qty: pursQty - prosQty,
      });
    });
    setMyInventory(arr);
  };
  useEffect(() => {
    updateProductions();
    updatePurchases();
    updateRawMaterials();
    inventorySetup();
  });
  return (
    <>
      <Container>
        <Card>
          <Card.Header className="title-btn">
            <span>Inventory</span>
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
