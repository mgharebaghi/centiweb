"use client";
import { Button, Container, Typography } from "@mui/material";
import { Col, Divider, Form, Input, Row } from "antd";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

function Login() {
  const route = useRouter();
  const [loading, setLoading] = useState(Boolean);
  const [msg, setMsg] = useState("");
  const [emailErr, setEmailErr] = useState(Boolean);
  const [passErr, setPassErr] = useState(Boolean);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault;
    setLoading(true);

    await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    }).then((res) => {
      setLoading(false);
      if (!res.ok) {
        setMsg("Server Error! Try again later.");
      } else {
        res.json().then((data) => {
          if (data.status === "success") {
            route.push("/admin");
          } else if (
            data.status === "error" &&
            data.description === "password"
          ) {
            setMsg("Password is wrong!");
            setPassErr(true);
          } else {
            setMsg("Admin not found!");
            setEmailErr(true);
          }
        });
      }
    });
  }

  useEffect(() => {
    document.title = "Admins login";
  }, []);

  return (
    <Container
      maxWidth="lg"
      className="w-[100%] h-[90vh] flex justify-center items-center"
    >
      <div className="w-[100%] h-[70%] bg-gray-100 shadow-lg rounded-md grid justify-center items-center">
        <Form
          onFinish={(ev) => {
            handleSubmit(ev);
          }}
        >
          <div className="text-center">
            <Typography variant="h5" className="font-bold text-gray-600">
              Login to admin pannel
            </Typography>
          </div>
          <Divider />
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="mb-5"
            onChange={(e) => {
              setEmail(e.target.value);
              setMsg("");
              setEmailErr(false);
              setPassErr(false);
            }}
            status={emailErr ? "error" : ""}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setMsg("");
              setPassErr(false);
              setEmailErr(false);
            }}
            status={passErr ? "error" : ""}
          />
          <Divider />
          <Row className="w-[100%]">
            <Col span={6}>
              <Button
                type="submit"
                variant="outlined"
                className="bg-gray-600 text-white border-gray-600 hover:bg-white hover:text-gray-600 hover:border-gray-600"
              >
                Login
              </Button>
            </Col>
            <Col span={18} className="flex items-center justify-center">
              {loading ? (
                <PulseLoader size={5} color="gray" />
              ) : (
                <Typography color="red">{msg}</Typography>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
