const clearAlert = (dispatch) => {
    setTimeout(() => {
        dispatch({ type: 'CLEAR_ALERT' });
    }, 3000)
}

export default clearAlert