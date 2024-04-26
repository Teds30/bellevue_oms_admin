import React, { useEffect, useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import styles from './Departments.module.css'
import useHttp from '../../hooks/http-hook'
import { Box, IconButton } from '@mui/material'
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react'

import '../../components/Table/Table.css'
import EditDepartment from './EditDepartment'
import AddDepartment from './AddDepartment'
import OutlinedButton from '../../components/Button/OutlinedButton'
import PrimaryButton from '../../components/Button/PrimaryButton'

const Departments = () => {
    const { sendRequest, isLoading } = useHttp()

    const [departments, setDepartments] = useState()
    const [deleteDepartment, setDeleteDepartment] = useState()

    const [open, setOpen] = React.useState(false)
    const handleClose = () => {
        setOpen(false)
        setDeleteDepartment(null)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const [openAdd, setOpenAdd] = useState(false)
    const handleAddClose = () => {
        setOpenAdd(false)
    }
    const handleAddOpen = () => {
        setOpenAdd(true)
    }

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_URL}/api/departments`,
        })

        setDepartments(res.data)
    }
    return (
        <div className={styles['container']}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h2 style={{ flex: 1 }}>Departments</h2>
                <PrimaryButton leftIcon={<IconPlus />} onClick={handleAddOpen}>
                    Add new
                </PrimaryButton>
            </Box>
            <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {' '}
                                <strong>NAME</strong>
                            </TableCell>
                            <TableCell align="right">
                                <strong>ACTIONS</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departments?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    <Box>
                                        <IconButton
                                            onClick={() => {
                                                handleOpen()
                                                setDeleteDepartment(row)
                                            }}
                                        >
                                            <IconPencil />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {deleteDepartment && (
                <EditDepartment
                    loadData={loadData}
                    department={deleteDepartment}
                    open={open}
                    handleClose={handleClose}
                />
            )}
            {openAdd && (
                <AddDepartment
                    loadData={loadData}
                    open={openAdd}
                    handleClose={handleAddClose}
                />
            )}
        </div>
    )
}

export default Departments
