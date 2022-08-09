let defaultState = {
	opacity: 1,
	translateY: 0,
}

let tabBarStyleReducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'SET_TAB_BAR_STYLE':
			return action.payload
		default:
			return state
	}
}

export default tabBarStyleReducer
