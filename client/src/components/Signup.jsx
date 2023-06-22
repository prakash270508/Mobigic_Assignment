import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const navigate = useNavigate();

  const data = {
    email,
    password,
    username,
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        data
      );

      console.log(response.data)

      toast.success("Registration Successfull please login")

      navigate('/')

    } catch (error) {}
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: "#6f60cc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h4 className="mb-5" style={{ color: "#6f60cc" }}>
                  <b>Signup</b>
                </h4>

                <form onSubmit={handleSignup}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      value={email}
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      value={username}
                      id="typeTextX-2"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      value={password}
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="mb-3" style={{ float: "left" }}>
                      <span>
                        <b>Already have account</b>
                      </span>
                      <Link className="links mx-2" to={"/"}>
                        Login
                      </Link>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block w-100"
                    type="submit"
                    onClick={handleSignup}
                  >
                    Sign up
                  </button>
                </form>

                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
