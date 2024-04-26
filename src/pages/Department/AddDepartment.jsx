import React from 'react'
import Modal from '../../components/Modal/Modal'
import { Backdrop, Box } from '@mui/material'
import TextField from '../../components/TextField/TextField'
import PrimaryButton from '../../components/Button/PrimaryButton'
import useValidate from '../../hooks/validate-input-hook'
import useHttp from '../../hooks/http-hook'

const AddDepartment = (props) => {
    const { open, handleClose, loadData } = props

    const {
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        hasError: enteredTitleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: titleReset,
        defaultValueHandler: titleDefaultValue,
    } = useValidate((value) => value.trim() !== '')

    const { sendRequest, isLoading } = useHttp()

    const handleSaveChanges = async () => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_URL}/api/departments`,
            method: 'POST',
            body: JSON.stringify({
                name: enteredTitle,
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
                title="Add new department"
                maxWidth={'500px'}
            >
                <Box sx={{ marginTop: '24px' }}>
                    <TextField
                        label="Name"
                        placeholder="Enter the department name"
                        value={enteredTitle}
                        onChange={titleChangeHandler}
                        onBlur={titleBlurHandler}
                        helperText={
                            enteredTitleHasError && 'This field is required.'
                        }
                        error
                    />
                    <Box sx={{ marginTop: '48px' }}>
                        <PrimaryButton
                            width="100%"
                            onClick={handleSaveChanges}
                            isLoading={isLoading}
                            loadingText="Saving changes"
                        >
                            Add Department
                        </PrimaryButton>
                    </Box>
                </Box>
            </Modal>
        </Backdrop>
    )
}

export default AddDepartment
