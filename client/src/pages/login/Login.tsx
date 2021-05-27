import React from "react";
import Navbar from "../../components/layout/navbar/Navbar";
import Card from "../../components/atoms/card/Card";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import NavbarLayout from "../../components/layout/navbar-layout/NavbarLayout";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useStore } from "../../store";
import { LoginRequest } from "../../store/auth";
import { observer } from "mobx-react";
import * as yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import Column from "../../components/atoms/column/Column";
import Content from "../../components/atoms/content/Content";

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
      <NavbarLayout nav={<Navbar type="signup" />}>
        <Content centered>
          <Column width={1 / 2}>
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
          </Column>
        </Content>
      </NavbarLayout>
    );
  }
);

export default Login;
