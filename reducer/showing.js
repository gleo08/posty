const initialState = {
    showing: false,
}

const showingReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_SHOWING": {
            return {
                ...state,
                showing: action.payload
            };
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export default showingReducer;