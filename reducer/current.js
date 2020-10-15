const initialState = {
    playing: true
}

const currentReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_PLAY": {
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

export default currentReducer;