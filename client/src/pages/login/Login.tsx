import React from "react";
import Navbar from "../../components/layout/navbar/Navbar";
import Card from "../../components/atoms/card/Card";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import SingleLayout from "../../components/layout/single-layout/SingleLayout";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useStore } from "../../store";
import { LoginRequest } from "../../store/auth";
import { observer } from "mobx-react";
import * as yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";

YupPassword(yup);

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required"),
  password: yup.string().password().required("Required"),
});

const Login = observer(
  (): JSX.Element => {
    const {
      control,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm({ resolver: yupResolver(loginSchema) });

    /**
     * TODO: - Add Error Messages for API responses
     *       - Add Forgot Password Flow
     */

    const { auth } = useStore();

    const onSubmit = handleSubmit((data: LoginRequest) => auth.login(data));

    return (
      <SingleLayout nav={<Navbar type="signup" />}>
        <Card>
          <h4>Login</h4>

          <form onSubmit={onSubmit}>
            <Input label="Email" name="email" control={control} />

            <Input
              label="Password"
              name="password"
              type="password"
              control={control}
            />

            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </form>
        </Card>
      </SingleLayout>
    );
  }
);

export default Login;
