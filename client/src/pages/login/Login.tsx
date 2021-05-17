import React from "react";
import Navbar from "../../components/layout/navbar/Navbar";
import Card from "../../components/atoms/card/Card";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import SingleLayout from "../../components/layout/single-layout/SingleLayout";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";

const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <SingleLayout nav={<Navbar type="login" />}>
      <Card>
        <h4>Login</h4>

        <form onSubmit={onSubmit}>
          <Input label="Email" {...register("email", { required: true })} />
          <Input
            label="Password"
            type="password"
            {...register("password", { required: true })}
          />

          <Button type="submit" className={styles.submitButton}>
            Submit
          </Button>
        </form>
      </Card>
    </SingleLayout>
  );
};

export default Login;
