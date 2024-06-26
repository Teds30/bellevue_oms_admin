import React from 'react'

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

import btn from './ButtonStyle.module.css'

const Button = (props) => {
    const {
        onClick,
        leftIcon,
        rightIcon,
        children,
        btnType,
        isLoading,
        loadingText,
        loadingColor = 'white',
        disabled = false,
        width,
        btnStyle,
        rounded = false,
    } = props

    const styles = { ...btn, ...btnStyle }

    if (!props) {
        return <button className={styles.btn}>{children}</button>
    }
    let btnRounded = ''
    if (rounded) {
        btnRounded = styles['btn-rounded']
    }

    let btnTypeStyle = ''
    if (btnType === 'danger') {
        btnTypeStyle = styles['btn-danger']
    }

    let btnIconPos = ''
    if (leftIcon) {
        btnIconPos = styles['icon-left']
    }

    return (
        <button
            className={`${styles.btn} ${btnTypeStyle} ${btnIconPos} ${btnRounded}`}
            onClick={onClick}
            disabled={disabled || isLoading}
            style={{ width }}
        >
            {leftIcon && !isLoading && (
                <div className={styles.icon}>{leftIcon}</div>
            )}
            <span>{!isLoading && children}</span>
            {isLoading && <LoadingSpinner width={16} color="primary" />}
            {isLoading && loadingText}
            {rightIcon && !isLoading && (
                <div className={styles.icon}>{rightIcon}</div>
            )}
        </button>
    )
}

export default Button
