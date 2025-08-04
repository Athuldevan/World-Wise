import { lazy, Suspense } from "react";

const Sidebar = lazy(() => import("../components/Sidebar"));
const Map = lazy(() => import("../components/Map"));
const User = lazy(() => import("../components/User"));
import styles from "./AppLayout.module.css";
import SpinnerFullPage from "../components/SpinnerFullPage";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Suspense fallback={<SpinnerFullPage />}>
        <Sidebar />

        <Map />
        <User />
      </Suspense>

      <p>App</p>
    </div>
  );
}

export default AppLayout;
