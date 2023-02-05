import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

export default function Login(props) {
  const [form, setForm] = useState({ username: "", password: "" });
  const handleLogin = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };
    const res = await fetch(`http://localhost:5000/users/login`, options).then(
      (res) => res.json()
    );
    if (res.status === 200) {
      props.setAccess(res.data);
      props.setLogin(true);
    }
    props.setToastMsg(res.message);
    props.setToast(true);
  };
  return (
    <div className="login">
      <Container>
        <Card>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type={"text"}
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  placeholder="Enter Username"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={"password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Enter Password"
                  required
                />
              </Form.Group>
              <Button type="submit">Login</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
