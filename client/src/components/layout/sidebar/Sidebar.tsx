import React from "react";
import styles from "./Sidebar.module.scss";
import { ReactComponent as Logo } from "../../../assets/svgs/logo.svg";
import DashboardIcon from "../../../assets/svgs/dashboard.svg";
import RolloutIcon from "../../../assets/svgs/rollout.svg";
import UserIcon from "../../../assets/images/user.png";
import ToolbarItem from "./toolbar-item/ToolbarItem";
import { observer } from "mobx-react";
import { useStore } from "../../../store";
import { useState } from "react";

interface Props {}

interface SidebarItem {
  icon: string;
  text: string;
  selected?: boolean;
  action?: () => void;
}

const Sidebar = observer(
  (props: Props): JSX.Element => {
    const { user } = useStore();

    const [sidebar] = useState<SidebarItem[]>([
      {
        icon: DashboardIcon,
        text: "Dashboard",
        selected: true,
        action: () => (user.setFirstName = "Dennis"),
      },
      {
        icon: RolloutIcon,
        text: "Rollout",
        selected: false,
        action: () => (user.setFirstName = "The Menace"),
      },
    ]);

    return (
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.toolbar}>
          <div className={styles.upper}>
            {sidebar.map((item) => (
              <ToolbarItem key={item.text} {...item} type="icon" />
            ))}
          </div>

          <div className={styles.lower}>
            <ToolbarItem
              icon={UserIcon}
              text={user.fullName}
              type="avatar"
              selected={true}
            />
          </div>
        </div>
      </aside>
    );
  }
);

export default Sidebar;
