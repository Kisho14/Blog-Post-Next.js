import React from 'react'
import styles from './footer.module.css' 

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Bingo Blogs</div>
      <div className={styles.text}>Bingo Blogs @ All rights reserved</div>
    </div>
  )
}

export default Footer