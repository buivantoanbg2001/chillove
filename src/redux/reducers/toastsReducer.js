let defaultState = []

let toastsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'ADD_TOAST':
			return [...state, action.payload]
		case 'REMOVE_TOAST':
			return state.filter(current => current.id !== action.payload.id)
		default:
			return state
	}
}

export default toastsReducer
