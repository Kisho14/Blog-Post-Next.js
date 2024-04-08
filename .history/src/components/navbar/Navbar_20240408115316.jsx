import Link from "next/link";
import React from "react";
import Links from "./links/Links";
import styles from "./navbar.module.css"

const Navbar = async () => {
const session = await auth();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>Blogs</Link>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
