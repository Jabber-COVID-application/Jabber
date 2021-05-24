import React, { useState } from "react";
import Navbar from "../../components/layout/navbar/Navbar";
import Card from "../../components/atoms/card/Card";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import NavbarLayout from "../../components/layout/navbar-layout/NavbarLayout";
import { useForm } from "react-hook-form";
import styles from "./Signup.module.scss";
import { useStore } from "../../store";
import { SignupRequest } from "../../store/auth";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import Column from "../../components/atoms/column/Column";
import Content from "../../components/atoms/content/Content";
import { UserType } from "../../types/user.types";
import { userTypePrettyName } from "../../utils/user.utils";

YupPassword(yup);

const signupSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  dateOfBirth: yup.string().required("Required"),
  email: yup.string().email("Invalid Email").required("Required"),
  password: yup.string().password().required("Required"),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = observer(
  (): JSX.Element => {
    const {
      control,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm({ resolver: yupResolver(signupSchema) });

    /**
     * TODO: - Add Error Messages for API responses
     */

    const { auth } = useStore();
    const history = useHistory();

    const [userType, setUserType] = useState<UserType | undefined>();

    const onSubmit = handleSubmit((data: SignupRequest) => {
      if (!userType) return;

      const { firstName, lastName, dateOfBirth, email, password } = data;

      auth
        .signup({
          firstName,
          lastName,
          dateOfBirth,
          email,
          password,
          type: userType,
        })
        .then((successful) => {
          if (successful) history.push("/login");
        });
    });

    return (
      <NavbarLayout nav={<Navbar type="login" />}>
        <Content centered>
          <Column width={1 / 2}>
            <Card className={styles.signup}>
              <h4>Sign up</h4>
              <p>
                {userType
                  ? `${userTypePrettyName(userType)} Account`
                  : "What kind of account do you require?"}
              </p>

              {userType ? (
                <form onSubmit={onSubmit}>
                  <Input
                    label="First Name"
                    name="firstName"
                    control={control}
                  />

                  <Input label="Last Name" name="lastName" control={control} />

                  <Input
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    control={control}
                  />

                  <Input label="Email" name="email" control={control} />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    control={control}
                  />

                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    control={control}
                  />

                  <Button
                    type="submit"
                    className={styles.button}
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </form>
              ) : (
                <>
                  <Button
                    styleType="outline"
                    className={styles.button}
                    onClick={() => setUserType(UserType.GENERAL)}
                  >
                    General Public
                  </Button>
                  <Button
                    styleType="outline"
                    className={styles.button}
                    onClick={() => setUserType(UserType.VENUE_ADMIN)}
                  >
                    Venue Owner
                  </Button>
                </>
              )}
            </Card>
          </Column>
        </Content>
      </NavbarLayout>
    );
  }
);

export default Signup;
