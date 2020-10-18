const initialState = {
    playing: true
}

const statusReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_STATUS": {
            return {
                ...state,
                playing: action.payload
            };
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export default statusReducer;