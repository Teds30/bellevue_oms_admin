import React, { useEffect, useState } from 'react'

import styles from './Permissions.module.css'
import Dropdown from '../../components/Dropdown/Dropdown'
import {
    IconArrowRight,
    IconBuilding,
    IconChevronRight,
} from '@tabler/icons-react'
import useHttp from '../../hooks/http-hook'
import { Box } from '@mui/material'
import PermissionsList from './PermissionsList'

import PrimaryButton from '../../components/Button/PrimaryButton'

const Permissions = () => {
    const { sendRequest, isLoading } = useHttp()

    const [departments, setDepartments] = useState()
    const [selectedDepartment, setSelectedDepartment] = useState()
    const [positions, setPositions] = useState()
    const [selectedPosition, setSelectedPosition] = useState()

    const [toSave, setToSave] = useState()

    const [posPerm, setPosPerm] = useState()

    const handleSelectDepartment = (e) => {
        setSelectedDepartment(e.target.value)
    }
    const handleSelectPosition = (e) => {
        setSelectedPosition(e.target.value)
    }

    useEffect(() => {
        const loadData = async () => {
            const res = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_URL}/api/departments`,
            })

            setDepartments(res.data)
        }

        loadData()
    }, [])

    const saveData = async () => {
        const res = await sendRequest({
            url: `${
                import.meta.env.VITE_BACKEND_URL
            }/api/update_permissions/${selectedPosition}`,
            method: 'PATCH',
            body: JSON.stringify({ codes: toSave }),
        })
    }

    useEffect(() => {
        const loadData = async () => {
            const res = await sendRequest({
                url: `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/department_positions/${selectedDepartment}`,
            })

            setPositions(res.data)
        }

        if (selectedDepartment) loadData()
    }, [selectedDepartment])

    return (
        <div className={styles['container']}>
            <h2>Permissions</h2>

            <div className={styles['position-select']}>
                <Dropdown
                    leadingIcon={
                        <IconBuilding size={20} color="var(--fc-body)" />
                    }
                    placeholder="Select department"
                    items={departments}
                    value={selectedDepartment}
                    selected={selectedDepartment}
                    handleSelect={handleSelectDepartment}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <IconArrowRight />
                </Box>
                <Dropdown
                    leadingIcon={
                        <IconBuilding size={20} color="var(--fc-body)" />
                    }
                    placeholder="Select position"
                    items={positions}
                    value={selectedPosition}
                    selected={selectedPosition}
                    handleSelect={handleSelectPosition}
                    disabled={!selectedDepartment}
                />
                <PrimaryButton
                    disabled={!positions?.length > 0 || !selectedPosition}
                    onClick={saveData}
                    isLoading={isLoading}
                    loadingText="Saving"
                >
                    Save
                </PrimaryButton>
            </div>
            {positions?.length > 0 && selectedPosition && (
                <PermissionsList
                    setToSave={setToSave}
                    position={positions?.find(
                        (obj) => obj.id === selectedPosition
                    )}
                />
            )}
        </div>
    )
}

export default Permissions
