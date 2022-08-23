let defaultState = [
	{
		email: 'buivantoanbg2001@gmail.com',
		username: 'oxy',
		avatar_url:
			'https://firebasestorage.googleapis.com/v0/b/chillove.appspot.com/o/avatar%2F22f2c1a1-e29c-4923-a24f-58bed1e871e5?alt=media&token=8689b6cc-4e4c-467e-beef-6129180c687a',
	},
	{
		email: 'linhngocbh2001@gmail.com',
		username: 'mandoo',
		avatar_url:
			'https://firebasestorage.googleapis.com/v0/b/chillove.appspot.com/o/avatar%2F029f9631-0057-4e92-bf8c-b9b292cbf134?alt=media&token=3b003fa2-8a6b-4874-9dbd-69c31f2c0b6c',
	},
]

let usersReducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'SET_USER_LIST':
			return action.payload
		default:
			return state
	}
}

export default usersReducer
