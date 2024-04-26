import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../components/Button/PrimaryButton'
import OutlinedButton from '../../components/Button/OutlinedButton'
import { Backdrop, Box } from '@mui/material'
import Modal from '../../components/Modal/Modal'

import useValidate from '../../hooks/validate-input-hook'
import TextField from '../../components/TextField/TextField'
import useHttp from '../../hooks/http-hook'

const EditDepartment = (props) => {
    const { open, handleClose, department, loadData } = props

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: enteredNameHasError,
        valueChangeHandler: enteredNameChangeHandler,
        inputBlurHandler: enteredNameBlurHandler,
        reset: enteredNameReset,
        defaultValueHandler: enteredNameDefaultValue,
    } = useValidate((value) => value.trim() !== '')

    const {
        value: enteredDelete,
        isValid: enteredDeleteIsValid,
        hasError: enteredDeleteHasError,
        valueChangeHandler: enteredDeleteChangeHandler,
        inputBlurHandler: enteredDeleteBlurHandler,
        reset: enteredDeleteReset,
        defaultValueHandler: enteredDeleteDefaultValue,
    } = useValidate((value) => value.trim() === department.name)

    const { sendRequest, isLoading } = useHttp()

    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        enteredNameDefaultValue(department.name)
    }, [])

    const handleDelete = async () => {
        if (enteredDelete === department.name) {
            const res = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_URL}/api/departments/${
                    department.id
                }`,
                method: 'DELETE',
            })

            setIsDeleting(false)
            loadData()
            handleClose()
        }
    }

    const handleSaveChanges = async () => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_URL}/api/departments/${
                department.id
            }`,
            method: 'PATCH',
            body: JSON.stringify({
                name: enteredName,
            }),
        })

        handleClose()

        loadData()
    }

    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            // onClick={handleClose}
        >
            <Modal
                onClose={handleClose}
                title="Editing Department"
                maxWidth={'500px'}
            >
                {isDeleting ? (
                    <Box
                        sx={{
                            color: 'var(--fc-body)',
                        }}
                    >
                        {/* <Box
                            sx={{
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                textAlign: 'center',
                                padding: '12px',
                                marginBottom: '12px',
                            }}
                        >
                            <h3>{department.name}</h3>
                        </Box> */}
                        <p className="title">
                            Are you sure you want to delete this department?
                        </p>
                        <p>
                            All employees in this department will be removed and
                            need to be reassigned to a different department.
                        </p>

                        <Box sx={{ marginTop: '12px' }}>
                            <Box
                                sx={{
                                    marginTop: '12px',
                                    marginBottom: '4px',
                                    padding: '12px',
                                    // background: 'rgba(var(--accent-rgb), 0.08)',
                                    background: 'var(--bg-layer2)',
                                    // border: '1px solid var(--accent)',
                                    borderRadius: '8px',
                                }}
                            >
                                Confirm deletion by entering:{' '}
                                <strong>{department.name}</strong>
                            </Box>
                            <TextField
                                label=""
                                placeholder="Enter the department's name"
                                value={enteredDelete}
                                onChange={enteredDeleteChangeHandler}
                                onBlur={enteredDeleteBlurHandler}
                                helperText={
                                    enteredDeleteHasError &&
                                    'Please ensure that the name matches the department being deleted.'
                                }
                                // disabled={isDeleting}
                                error
                            />
                        </Box>
                        <Box
                            sx={{
                                margin: '24px 0',
                                display: 'flex',
                                gap: '12px',
                            }}
                        >
                            <OutlinedButton
                                onClick={() => setIsDeleting(false)}
                            >
                                Cancel
                            </OutlinedButton>
                            <PrimaryButton
                                width="100%"
                                isLoading={isLoading}
                                loadingText="Deleting"
                                btnType="danger"
                                onClick={handleDelete}
                                disabled={!enteredDeleteIsValid}
                            >
                                Delete Department
                            </PrimaryButton>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ marginTop: '24px' }}>
                        <TextField
                            label=""
                            placeholder="Enter name"
                            value={enteredName}
                            onChange={enteredNameChangeHandler}
                            onBlur={enteredNameBlurHandler}
                            helperText={
                                enteredNameHasError && 'This field is required.'
                            }
                            disabled={isDeleting}
                            error
                        />
                        <Box sx={{ marginTop: '12px' }}>
                            <Box
                                sx={{
                                    margin: '24px 0',
                                    color: 'var(--accent-danger)',
                                    fontWeight: 600,
                                    textAlign: 'center',
                                }}
                                onClick={() => setIsDeleting(true)}
                            >
                                Delete department
                            </Box>
                            <PrimaryButton
                                width="100%"
                                onClick={handleSaveChanges}
                                isLoading={isLoading}
                                disabled={enteredNameHasError}
                                loadingText="Saving changes"
                            >
                                Save changes
                            </PrimaryButton>
                        </Box>
                    </Box>
                )}
            </Modal>
        </Backdrop>
    )
}

export default EditDepartment
