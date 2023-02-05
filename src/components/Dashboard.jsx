import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import { Bar, Pie } from "react-chartjs-2";
import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/esm/Container";

export default function Dashboard() {
  Chart.register(CategoryScale);
  // set data
  const [pieData, setPieData] = useState({
    labels: ["Cash In Hand", "Receivable", "Assets"],
    datasets: [
      {
        label: "Amount",
        data: [431290, 150290, 320100],
        backgroundColor: ["#BFD8FF", "#1093FF", "#E7F1FF"],
        borderWidth: 3,
      },
    ],
  });
  const [barData, setBarData] = useState({
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUNE",
      "JULY",
      "AGU",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "Sales",
        data: [48, 35, 73, 82, 95, 93, 88, 91, 103, 145, 105, 139],
        backgroundColor: ["#BFD8FF", "#1093FF", "#E7F1FF"],
        borderWidth: 3,
      },
      {
        label: "Returns",
        data: [6, 4, 13, 18, 23, 43, 43, 54, 23, 12, 23, 56],
        backgroundColor: ["#BFD8FF", "#1093FF", "#E7F1FF"],
        borderWidth: 3,
      },
    ],
  });
  // set options
  const [barOptions, setBarOptions] = useState({
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      title: {
        display: false,
      },
      legend: {
        display: false,
        position: "top",
      },
    },
  });

  return (
    <Container>
      <Card>
        <Card.Header className="darkBlue myLight">
          <h3>Dashboard</h3>
        </Card.Header>
        <Card.Body className="lightBlue">
          <Row>
            <Col sm={6} lg={3} className="mb-3">
              <Card className={"border-0"}>
                <Card.Body>
                  <Card.Title>Cash In Hand</Card.Title>
                  <span>431290</span>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3} className="mb-3">
              <Card className={"border-0"}>
                <Card.Body>
                  <Card.Title>Receivable</Card.Title>
                  <span>50290</span>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3} className="mb-3">
              <Card className={"border-0"}>
                <Card.Body>
                  <Card.Title>Payable</Card.Title>
                  <span>23990</span>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={3} className="mb-3">
              <Card className={"border-0"}>
                <Card.Body>
                  <Card.Title>Assets</Card.Title>
                  <span>30100</span>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Accordion defaultActiveKey={1}>
            <Accordion.Item eventKey={1}>
              <Accordion.Header className="darkBluebtn myLight">
                Statistics
              </Accordion.Header>
              <Accordion.Body className="lightBlue">
                <Row>
                  <Col lg={8} sm={12} className="mb-3">
                    <Card className="border-0">
                      <Card.Body className="lightBlue">
                        <Card.Title>Sales</Card.Title>
                        <Bar data={barData} options={barOptions.options} />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={4} sm={12} className="mb-3">
                    <Card className="border-0">
                      <Card.Body className="lightBlue">
                        <Card.Title>Cash</Card.Title>
                        <Pie
                          className="d-flex justify-content-center"
                          data={pieData}
                          options={barOptions.options}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={2}>
              <Accordion.Header className="darkBluebtn myLight">
                About Today
              </Accordion.Header>
              <Accordion.Body className="lightBlue">
                <Row>
                  <Col lg={6} sm={12} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>Sold Today</Card.Title>
                        <Table striped hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Invoice #</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>927</td>
                              <td>4800</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>421</td>
                              <td>1820</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>238</td>
                              <td>9140</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>832</td>
                              <td>9230</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={6} sm={12} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>Return(s) Today</Card.Title>
                        <Table striped hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Invoice #</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>127</td>
                              <td>800</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>637</td>
                              <td>220</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    </Container>
  );
}
