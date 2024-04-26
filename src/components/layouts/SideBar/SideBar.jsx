import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './SideBar.module.css'

import {
    TbLayoutGrid,
    TbHomeDollar,
    TbSitemap,
    TbSocialOff,
    TbUserCheck,
    TbHomeCheck,
    TbFlag,
} from 'react-icons/tb'
import { BsPeople, BsStars } from 'react-icons/bs'

import SideBarItem from './SideBarItem'
import { IconBuilding, IconLockAccess } from '@tabler/icons-react'

const SideBar = () => {
    return (
        <div className={styles['sb-container']}>
            <aside className={styles['sb']}>
                <div className={styles['sb-brand']}>
                    <div className={styles['sb-brand-logo']}></div>
                    <div className={styles['sb-brand-content']}>
                        <p className={'title'}>Bellevue OMS</p>
                        <p>Admin</p>
                    </div>
                </div>

                <div className={styles['sb-item-group']}>
                    <SideBarItem
                        icon={
                            <TbLayoutGrid
                                size={24}
                                style={{
                                    fill: 'transparent',
                                    strokeWidth: '1.5px',
                                }}
                            />
                        }
                        label="Overview"
                        to="/"
                    />
                    <SideBarItem
                        icon={
                            <IconLockAccess
                                size={24}
                                style={{
                                    fill: 'transparent',
                                    strokeWidth: '1.5px',
                                }}
                            />
                        }
                        label="Permissions"
                        to="/permissions"
                    />
                    <SideBarItem
                        icon={
                            <IconBuilding
                                size={24}
                                style={{
                                    fill: 'transparent',
                                    strokeWidth: '1.5px',
                                }}
                            />
                        }
                        label="Departments"
                        to="/departments"
                    />
                </div>
            </aside>
        </div>
    )
}

export default SideBar
