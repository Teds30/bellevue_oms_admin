import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './SideBar.module.css'
const SideBarItem = (props) => {
    const {
        label='',
        to = '',
        icon
    } = props
  return (
    <NavLink className={({ isActive }) =>
    isActive ? `${styles["sb-item"]} ${styles["sb-selected"]}` : `${styles["sb-item"]}`} to={to}>
            <div className={`${styles["sb-item-icon"]}`}>
            {icon}
            </div>
            <div className={styles["sb-item-title"]}>{label}</div>
        </NavLink>
  )
}

export default SideBarItem