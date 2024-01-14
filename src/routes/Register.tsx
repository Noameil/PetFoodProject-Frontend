import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Spinner from "../components/Spinner/Spinner";
import authService from "../services/auth-service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Cart } from "../backend/@Types";
import Page from "./Page";

const Register = () => {
  const nav = useNavigate();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    username: Yup.string().min(2).required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(6)
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,20}$/)
      .required(),
  });

  // const newCart: Cart = {
  //   cartId: "",
  //   cartItems: [], // Initialize an empty array of cart items
  // };

  const intiailValues = {
    username: "",
    email: "",
    password: "",
    // cart: newCart
  };

  return (
    <Page>
      <Formik
        validationSchema={validationSchema}
        initialValues={intiailValues}
        onSubmit={({ username, email, password }) => {
          setLoading(true); //show progress spinner
          setError(undefined); //new round - clean slate
          authService
            .register(username, email, password)
            .then((res) => {
              Swal.fire({
                title: "Registered successfully",
                icon: "success",
                timer: 2000,
              });
              //navigate
              nav("/login");
            })
            .catch((e) => {
              setError(e.response.data.message);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        <Form className="py-12">
          {loading && <Spinner title="" />}
          {error && (
            <p className="text-red-500 flex justify-center w-fit mx-auto px-10 py-5 mt-4 rounded-3xl italic shadow-md">
              {error}
            </p>
          )}
          <div className="flex justify-center items-center py-12">
            <div className="mt-12 bg-blue-200 p-8 rounded shadow-md w-96 dark:bg-blue-100">
              <h2 className="text-2xl font-semibold mb-4">Register</h2>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium text-start"
                >
                  Email
                </label>
                <Field
                  className="w-full p-2 border rounded placeholder:focus-within:text-transparent"
                  placeholder="Email"
                  name="email"
                  type="email"
                  id="email"
                />
                <ErrorMessage
                  name="Email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block mb-1 font-medium text-start"
                >
                  Username
                </label>
                <Field
                  className="w-full p-2 border rounded placeholder:focus-within:text-transparent"
                  placeholder="Username"
                  name="username"
                  type="text"
                  id="username"
                />
                <ErrorMessage
                  name="Username"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-1 font-medium text-start"
                >
                  Password
                </label>
                <Field
                  className="w-full p-2 border rounded placeholder:focus-within:text-transparent"
                  placeholder="Password"
                  name="password"
                  type="password"
                  id="password"
                />
                <ErrorMessage
                  name="Password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                disabled={loading}
              >
                Register
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </Page>
  );
};

export default Register;
