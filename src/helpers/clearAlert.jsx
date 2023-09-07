let alertTimerId;

const clearAlert = (dispatch) => {
    if (alertTimerId) {
        clearTimeout(alertTimerId);
    }

    alertTimerId = setTimeout(() => {
        dispatch({ type: 'CLEAR_ALERT' });
    }, 3000); 
};

export default clearAlert;
