import { Outlet } from "react-router-dom";
import Logo from "./Logo";
// import PageNav from "./PageNav";
import styles from './Sidebar.module.css'
import Appnav from "./Appnav";


function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Appnav/>
      {/* <PageNav/> */}
    <Outlet/>
    
      <footer className={styles.footer}>
        <p className= {styles.copyright}>&copy; Copyright</p>
      </footer>
    </div>
  );
}

export default Sidebar;
