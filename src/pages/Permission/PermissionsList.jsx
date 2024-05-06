import React, { useEffect, useState } from 'react'

import { permissionsData } from './permissions_data'

import styles from './Permissions.module.css'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Checkbox, FormControlLabel, Tab } from '@mui/material'
import useHttp from '../../hooks/http-hook'

const PermissionsList = (props) => {
    const { position, setToSave } = props

    const { sendRequest } = useHttp()
    const [posPerm, setPosPerm] = useState()
    const [currentPerm, setCurrentPerm] = useState()

    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    useEffect(() => {
        const loadData = async () => {
            const res = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/position_permissions/${position.id}`,
            })

            setPosPerm(res.data.permissions)
            setCurrentPerm(res.data.permissions)
        }

        loadData()
    }, [position])

    // Filter permissions based on categories
    const tasksPermissions = permissionsData.filter(
        (permission) => permission.code >= 101 && permission.code <= 199
    )
    const projectsPermissions = permissionsData.filter(
        (permission) => permission.code >= 201 && permission.code <= 299
    )
    const departmentPermissions = permissionsData.filter(
        (permission) => permission.code >= 301 && permission.code <= 399
    )
    const metricsPermissions = permissionsData.filter(
        (permission) => permission.code >= 401 && permission.code <= 499
    )
    const reportsPermissions = permissionsData.filter(
        (permission) => permission.code >= 501 && permission.code <= 599
    )

    // Function to check if access code exists in permissions array
    const checkAccessCode = (accessCode) => {
        if (!currentPerm) return false

        return currentPerm.includes(accessCode.toString())
    }

    useEffect(() => {
        setToSave(currentPerm)
    }, [currentPerm])

    const checkSave = (code, e) => {
        if (e.target.checked) {
            setCurrentPerm((prevPerms) => [...prevPerms, code.toString()]) // add the code to the permissions
        } else {
            setCurrentPerm((prevPerms) =>
                prevPerms.filter((item) => item !== code.toString())
            )
        }
    }

    return (
        <div className={styles['container']}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        sx={{
                            '& .Mui-selected': {
                                color: 'var(--accent) !important',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'var(--accent)', // Change indicator color
                            },
                        }}
                        // indicatorColor='red'
                    >
                        <Tab label="Tasks" value={0} />
                        <Tab label="Projects" value={1} />
                        <Tab label="Department" value={2} />
                        <Tab label="Metrics" value={3} />
                        <Tab label="Reports" value={4} />
                    </TabList>
                </Box>
                <TabPanel
                    value={0}
                    sx={{ padding: '0', width: '100%', maxWidth: '500px' }}
                >
                    <h4>Tasks Permission</h4>

                    <div className={styles['permission-container']}>
                        {currentPerm &&
                            tasksPermissions.map((perm, index) => {
                                return (
                                    <div
                                        className={`${styles['permission']}`}
                                        key={index}
                                    >
                                        <FormControlLabel
                                            sx={{ color: 'var(--fc-body)' }}
                                            control={
                                                <Checkbox
                                                    checked={checkAccessCode(
                                                        perm.code
                                                    )}
                                                    style={{
                                                        color: 'var(--accent)',
                                                    }}
                                                    onChange={(e) => {
                                                        checkSave(perm.code, e)
                                                    }}
                                                />
                                            }
                                            label={perm.name}
                                        />
                                        {/* <p className="title">{perm.code}</p> */}
                                        {/* <p>{perm.name}</p> */}
                                    </div>
                                )
                            })}
                    </div>
                </TabPanel>
                <TabPanel
                    value={1}
                    sx={{ padding: '0', width: '100%', maxWidth: '500px' }}
                >
                    <h4>Projects Permission</h4>

                    <div className={styles['permission-container']}>
                        {currentPerm &&
                            projectsPermissions.map((perm, index) => {
                                return (
                                    <div
                                        className={`${styles['permission']}`}
                                        key={index}
                                    >
                                        <FormControlLabel
                                            sx={{ color: 'var(--fc-body)' }}
                                            control={
                                                <Checkbox
                                                    checked={checkAccessCode(
                                                        perm.code
                                                    )}
                                                    style={{
                                                        color: 'var(--accent)',
                                                    }}
                                                />
                                            }
                                            onChange={(e) => {
                                                checkSave(perm.code, e)
                                            }}
                                            label={perm.name}
                                        />
                                        {/* <p className="title">{perm.code}</p> */}
                                        {/* <p>{perm.name}</p> */}
                                    </div>
                                )
                            })}
                    </div>
                </TabPanel>
                <TabPanel
                    value={2}
                    sx={{ padding: '0', width: '100%', maxWidth: '500px' }}
                >
                    <h4>Department Permission</h4>

                    <div className={styles['permission-container']}>
                        {currentPerm &&
                            departmentPermissions.map((perm, index) => {
                                return (
                                    <div
                                        className={`${styles['permission']}`}
                                        key={index}
                                    >
                                        <FormControlLabel
                                            sx={{ color: 'var(--fc-body)' }}
                                            control={
                                                <Checkbox
                                                    checked={checkAccessCode(
                                                        perm.code
                                                    )}
                                                    style={{
                                                        color: 'var(--accent)',
                                                    }}
                                                />
                                            }
                                            onChange={(e) => {
                                                checkSave(perm.code, e)
                                            }}
                                            label={perm.name}
                                        />
                                        {/* <p className="title">{perm.code}</p> */}
                                        {/* <p>{perm.name}</p> */}
                                    </div>
                                )
                            })}
                    </div>
                </TabPanel>
                <TabPanel
                    value={3}
                    sx={{ padding: '0', width: '100%', maxWidth: '500px' }}
                >
                    <h4>Metrics Permission</h4>

                    <div className={styles['permission-container']}>
                        {currentPerm &&
                            metricsPermissions.map((perm, index) => {
                                return (
                                    <div
                                        className={`${styles['permission']}`}
                                        key={index}
                                    >
                                        <FormControlLabel
                                            sx={{ color: 'var(--fc-body)' }}
                                            control={
                                                <Checkbox
                                                    checked={checkAccessCode(
                                                        perm.code
                                                    )}
                                                    style={{
                                                        color: 'var(--accent)',
                                                    }}
                                                />
                                            }
                                            onChange={(e) => {
                                                checkSave(perm.code, e)
                                            }}
                                            label={perm.name}
                                        />
                                        {/* <p className="title">{perm.code}</p> */}
                                        {/* <p>{perm.name}</p> */}
                                    </div>
                                )
                            })}
                    </div>
                </TabPanel>
                <TabPanel
                    value={4}
                    sx={{ padding: '0', width: '100%', maxWidth: '500px' }}
                >
                    <h4>Reports Permission</h4>

                    <div className={styles['permission-container']}>
                        {currentPerm &&
                            reportsPermissions.map((perm, index) => {
                                return (
                                    <div
                                        className={`${styles['permission']}`}
                                        key={index}
                                    >
                                        <FormControlLabel
                                            sx={{ color: 'var(--fc-body)' }}
                                            control={
                                                <Checkbox
                                                    checked={checkAccessCode(
                                                        perm.code
                                                    )}
                                                    style={{
                                                        color: 'var(--accent)',
                                                    }}
                                                />
                                            }
                                            onChange={(e) => {
                                                checkSave(perm.code, e)
                                            }}
                                            label={perm.name}
                                        />
                                        {/* <p className="title">{perm.code}</p> */}
                                        {/* <p>{perm.name}</p> */}
                                    </div>
                                )
                            })}
                    </div>
                </TabPanel>
            </TabContext>
        </div>
    )
}

export default PermissionsList
