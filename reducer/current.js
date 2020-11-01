const initialState = {
    img: null,
    title: null,
    artist: null,
    url: null,
    id: null,
}

const currentReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_SONG": {
            return {
                ...state,
                ...action.payload
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