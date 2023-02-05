import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Table,
} from "react-bootstrap";

export default function ManageSalary(props) {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
  });
  const [attendance, setAttendance] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [mySalaries, setMySalaries] = useState([]);
  const [showSalaries, setShowSalaries] = useState(false);
  const calculateSalary = (perMinute, cnic) => {
    let calculatedSalary = 0;
    mySalaries.map((i) => {
      if (i.cnic == cnic) {
        const checkIn = i.checkIn.split(":");
        const checkInHour = parseInt(checkIn[0]) * 60;
        const checkOut = i.checkOut.split(":");
        const checkOutHour = parseInt(checkOut[0]) * 60;
        const timeSpent =
          (parseInt(checkOut[1]) + checkOutHour) * perMinute -
          (parseInt(checkIn[1]) + checkInHour) * perMinute;
        calculatedSalary += timeSpent;
      }
    });
    return calculatedSalary;
  };
  const handleGenerate = async (e) => {
    e.preventDefault();
    let startFound = false;
    let endFound = false;
    const temp = [];
    for (let i = attendance.length - 1; i >= 0; i--) {
      if (attendance[i].date == form.endDate) {
        endFound = true;
      }
      if (attendance[i].date == form.startDate) {
        endFound = false;
        startFound = true;
      }
      if (endFound) {
        temp.push(attendance[i]);
      }
      if (startFound && attendance[i].date == form.startDate) {
        temp.push(attendance[i]);
      }
    }
    setMySalaries(temp);
    setShowSalaries(true);
  };
  const updateAttendance = async () => {
    const res = await fetch("http://localhost:5000/attendance").then((res) =>
      res.json()
    );
    setAttendance(res.data);
  };
  const updateEmployee = async () => {
    const res = await fetch("http://localhost:5000/employees").then((res) =>
      res.json()
    );
    setEmployee(res.data);
  };
  useEffect(() => {
    updateAttendance();
    updateEmployee();
  }, []);
  return (
    <>
      <Container>
        <Card className="mb-3">
          <Card.Header>Generate Salaries</Card.Header>
          <Card.Body>
            <Form onSubmit={handleGenerate}>
              <Row className="mb-3">
                <Col sm={12} lg={6}>
                  <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({ ...form, startDate: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} lg={6}>
                  <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      value={form.endDate}
                      onChange={(e) =>
                        setForm({ ...form, endDate: e.target.value })
                      }
                      type="date"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit">Generate Salaries</Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <div className="title-btn">
              <span>Salaries</span>
              <Button>Pay All</Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>CNIC</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {showSalaries &&
                  employee.map((i, index) => {
                    let salaryTotal = calculateSalary(
                      parseInt(i.salary) / 26 / 8 / 60,
                      i.cnic
                    );
                    return (
                      <tr key={`employee-salary-${index}`}>
                        <td>{index + 1}</td>
                        <td>{i.title}</td>
                        <td>{i.cnic}</td>
                        <td>{salaryTotal}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
