import React from "react";
import styles from "./Sidebar.module.scss";
import { ReactComponent as Logo } from "../../../assets/svgs/logo.svg";
import DashboardIcon from "../../../assets/svgs/dashboard.svg";
import RolloutIcon from "../../../assets/svgs/rollout.svg";
import UserIcon from "../../../assets/images/user.png";
import SidebarItem from "./sidebar-item/SidebarItem";
import { observer } from "mobx-react";
import { useStore } from "../../../store";
import { useState } from "react";
import { useHistory } from "react-router-dom";

interface SidebarItem {
  name: string;
  icon: string;
  text: string;
  action?: () => void;
}

const Sidebar = observer(
  (): JSX.Element => {
    const {
      user,
      auth,
      sidebar: { selected },
    } = useStore();

    const history = useHistory();

    const [sidebarItems] = useState<SidebarItem[]>([
      {
        name: "dashboard",
        icon: DashboardIcon,
        text: "Dashboard",
        action: () => history.push("/dashboard"),
      },
      {
        name: "rollout",
        icon: RolloutIcon,
        text: "Rollout",
        action: () => history.push("/rollout"),
      },
    ]);

    return (
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.toolbar}>
          <div className={styles.upper}>
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.name}
                selected={selected === item.name}
                type="icon"
                {...item}
              />
            ))}
          </div>

          <div className={styles.lower}>
            <SidebarItem
              icon={UserIcon}
              text={user.fullName || ""}
              type="avatar"
              selected={selected === "profile"}
              action={() => auth.logout()}
            />
          </div>
        </div>
      </aside>
    );
  }
);

export default Sidebar;
