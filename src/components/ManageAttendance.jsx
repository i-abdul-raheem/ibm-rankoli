import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Table,
  Row,
  Col,
} from "react-bootstrap";

export default function ManageAttendance(props) {
  const [form, setForm] = useState({
    cnic: "",
  });
  const [attendance, setAttendance] = useState([]);

  const checkMeIn = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };
    const res = await fetch(`http://localhost:5000/attendance`, options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
  };

  const checkMeOut = async (e) => {
    e.preventDefault();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };
    const res = await fetch(`http://localhost:5000/attendance`, options).then(
      (res) => res.json()
    );
    props.setToastMsg(res.message);
    props.setToast(true);
  };

  const setMonth = (val) => {
    const temp = val.toString().split("");
    if (temp.length < 2) {
      return "0" + val.toString();
    }
    return val.toString();
  };

  const setDay = (val) => {
    const temp = val.toString().split("");
    if (temp.length < 2) {
      return "0" + val.toString();
    }
    return val.toString();
  };

  const updateAttendance = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = setMonth(date.getMonth() + 1);
    const day = setDay(date.getDate());
    const today = `${year}-${month}-${day}`;
    const res = await fetch(
      `http://localhost:5000/attendance/date/${today}`
    ).then((res) => res.json());
    setAttendance(res.data);
  };

  useEffect(() => {
    updateAttendance();
  });

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <Form onSubmit={checkMeIn}>
              <Card className="mb-3">
                <Card.Header>Check In</Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Form.Label>CNIC</Form.Label>
                    <Form.Control
                      type="number"
                      maxLength={13}
                      minLength={13}
                      value={form.cnic}
                      onChange={(e) =>
                        setForm({ ...form, cnic: e.target.value })
                      }
                      placeholder="Enter CNIC Number"
                      required
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Footer>
                  <Button type="submit">Check In</Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>

          <Col sm={12} md={6}>
            <Form onSubmit={checkMeOut}>
              <Card className="mb-3">
                <Card.Header>Check Out</Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Form.Label>CNIC</Form.Label>
                    <Form.Control
                      type="number"
                      maxLength={13}
                      minLength={13}
                      value={form.cnic}
                      onChange={(e) =>
                        setForm({ ...form, cnic: e.target.value })
                      }
                      placeholder="Enter CNIC Number"
                      required
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Footer>
                  <Button type="submit">Check Out</Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
        <Card>
          <Card.Header>Today's Attendance</Card.Header>
          <Card.Body>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>CNIC</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((i, index) => (
                  <tr key={`attendance-index-${index}`}>
                    <td>{index + 1}</td>
                    <td>{i.cnic}</td>
                    <td>{i.checkIn}</td>
                    <td>{i.checkOut}</td>
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
