import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './AdminLayout.module.css'
import SideBar from './SideBar/SideBar'

const AdminLayout = (props) => {
    const { children } = props

    return (
        <main className={styles['main-container']}>
            <div className={styles['col']}>
                <SideBar></SideBar>
            </div>
            <div className={styles['col2']}>
                {/* <TopBar></TopBar> */}
                <section className={styles['content']}>
                    {/* {children} */}
                    <Outlet />
                </section>
            </div>
        </main>
    )
}

export default AdminLayout
