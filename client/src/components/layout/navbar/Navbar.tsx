import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { ReactComponent as Logo } from "../../../assets/svgs/logo.svg";
import { useHistory } from "react-router-dom";
import Button from "../../atoms/button/Button";

type NavbarType = "login" | "signup";

interface Props {
  type: NavbarType | "blank";
}

interface NavbarSection {
  text: string;
  buttonText: string;
  action: () => void;
}

type NavbarSections = {
  [id in NavbarType]: NavbarSection;
};

const Navbar = (props: Props): JSX.Element => {
  const history = useHistory();
  const { type } = props;

  const [actions] = useState<NavbarSections>({
    signup: {
      text: "Don't have an account yet?",
      buttonText: "Sign up",
      action: () => history.push("/signup"),
    },
    login: {
      text: "Already have an account?",
      buttonText: "Login",
      action: () => history.push("/login"),
    },
  });

  return (
    <div className={styles.navbar}>
      <div className={styles.overlay}>
        <div className={styles.logo}>
          <Logo />
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.left} />
        <div className={styles.right}>
          {type === "blank" ? (
            <></>
          ) : (
            <>
              <p>{actions[type].text}</p>
              <Button onClick={actions[type].action} styleType="outline">
                {actions[type].buttonText}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
