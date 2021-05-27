import React, { useEffect } from "react";
import styles from "./Sidebar.module.scss";
import { ReactComponent as Logo } from "../../../assets/svgs/logo.svg";
import DashboardIcon from "../../../assets/svgs/dashboard.svg";
import RolloutIcon from "../../../assets/svgs/rollout.svg";
import VisitsIcon from "../../../assets/svgs/visits.svg";
import UserIcon from "../../../assets/images/user.png";
import SidebarItem from "./sidebar-item/SidebarItem";
import { observer } from "mobx-react";
import { useStore } from "../../../store";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

interface SidebarItem {
  path: string;
  icon: string;
  text: string;
  action?: () => void;
}

const Sidebar = observer(
  (): JSX.Element => {
    const { user, auth } = useStore();

    const history = useHistory();
    const location = useLocation();

    const [selected, setSelected] = useState<string>("");

    const [sidebarItems] = useState<SidebarItem[]>([
      {
        path: "/dashboard",
        icon: DashboardIcon,
        text: "Dashboard",
        action: () => history.push("/dashboard"),
      },
      {
        path: "/rollout",
        icon: RolloutIcon,
        text: "Rollout",
        action: () => history.push("/rollout"),
      },
      {
        path: "/visits",
        icon: VisitsIcon,
        text: "Visits",
        action: () => history.push("/visits"),
      },
    ]);

    useEffect(() => {
      const path = location.pathname;

      setSelected("");

      sidebarItems.forEach((item) => {
        if (path.startsWith(item.path)) setSelected(item.path);
      });

      if (path.startsWith("/profile")) setSelected("/profile");
    }, [location]);

    return (
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.toolbar}>
          <div className={styles.upper}>
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.path}
                selected={selected === item.path}
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
              selected={selected === "/profile"}
              action={() => history.push("/profile")}
            />
          </div>
        </div>
      </aside>
    );
  }
);

export default Sidebar;
