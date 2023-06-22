import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        data
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in");
      window.location.reload();
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
      localStorage.removeItem('token')
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#6f60cc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h4 style={{ color: "#6f60cc" }}>
                    <b>Welcome</b>
                  </h4>
                  <p
                    className="text-secondary"
                    style={{ marginBottom: "50px" }}
                  >
                    <b>Lorem ipsum dolor sit amet consecte</b>
                  </p>

                  <form onSubmit={handleSubmit}>
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
                        <Link className="links" to={"/sign-up"}>
                          Create Account
                        </Link>
                      </div>
                      <div style={{ float: "right", color: "#6f60cc" }}>
                        <p
                          className="links"
                          onClick={() => alert("Work in progress")}
                        >
                          {" "}
                          Forgot Password{" "}
                        </p>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block w-100"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>

                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
