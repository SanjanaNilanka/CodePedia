import React from 'react'

export default function ToastMsg({toastMsg, isDark}) {

    return (
        <div>
            <div className={isDark?'toast-msg  toast-msg-dark':'toast-msg  toast-msg-light'}>
                <p>{toastMsg}</p>
                <span class="notification__progress"></span>
            </div>
        </div>
    )
}