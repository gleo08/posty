const initialState = {
    img: null,
    title: null,
    description: null,
    showing: false,
    // timeRemaining: null,
    // timeElapsed: '0:00',
    // trackLength: null,
    // id: null,
}

const currentReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_SONG": {
            return {
                ...state,
                ...action.payload
                // timeRemaining: action.payload,
                // trackLength: action.payload,
                // id: action.payload,
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