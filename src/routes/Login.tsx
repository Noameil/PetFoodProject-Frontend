import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import Spinner from "../components/Spinner/Spinner";
import authService from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Page from "./Page";

const Login = () => {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    username: Yup.string().min(2).required(),
    password: Yup.string()
      .min(6)
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,20}$/)
      .required(),
  });

  const intiailValues = {
    username: "",
    password: "",
  };

  return (
    <Page>
      <Formik
        validationSchema={validationSchema}
        initialValues={intiailValues}
        onSubmit={({ username, password }) => {
          setLoading(true); //show progress spinner
          setError(undefined); //new round - clean slate
          authService
            .login(username, password)
            .then((res) => {
              //save the username and jwt in the app context (in memory - app wide state)
              login(username, res.data.jwt);
              nav("/home");
            })
            .catch((e) => {
              console.log("Error?");
              setError("Sign in failed, username or password is incorrect");
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        <Form className="py-16">
          {loading && <Spinner title="" />}
          {error && (
            <p className="text-red-500 flex justify-center w-fit mx-auto px-10 py-5 mt-4 rounded-3xl italic shadow-md">
              {error}
            </p>
          )}
          <div className="flex justify-center items-center py-16">
            <div className="mt-12 bg-blue-200 p-8 rounded shadow-md w-96 dark:bg-blue-100">
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
                Login
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </Page>
  );
};

export default Login;
