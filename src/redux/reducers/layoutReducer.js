let defaultState = {
	// mode: 'regular',
	// mode: 'modern',
	mode: 'aesthetic',
}

let layoutReducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'SET_LAYOUT_MODE':
			return action.payload
		default:
			return state
	}
}

export default layoutReducer
