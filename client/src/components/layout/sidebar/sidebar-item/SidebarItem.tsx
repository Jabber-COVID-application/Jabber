import React, { FunctionComponent } from "react";
import { ReactSVG } from "react-svg";
import styles from "./SidebarItem.module.scss";

interface Props {
  icon: string;
  text: string;
  type: "icon" | "avatar";
  selected?: boolean;
  action?: () => void;
}

const SidebarItem = (props: Props): JSX.Element => {
  const { icon, text, type, selected, action } = props;

  return (
    <div className={`${styles.item} ${selected ? styles.selected : ""}`}>
      <button onClick={action}>
        {type === "icon" && <ReactSVG src={icon} className={styles.icon} />}
        {type === "avatar" && (
          <div className={`${styles.icon} ${styles.avatar}`}>
            <img src={icon} alt="Avatar" />
          </div>
        )}
        <span className={styles.text}>{text}</span>
      </button>
    </div>
  );
};

export default SidebarItem;
