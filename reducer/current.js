const initialState = {
    img: null,
    title: null,
    artist: null,
    url: null,
    timeRemaining: null,
    trackLength: null,
    timeElapsed: '0:00',
    id: null,
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