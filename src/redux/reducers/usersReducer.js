let defaultState = {
  'buivantoanbg2001@gmail.com': {
    email: 'buivantoanbg2001@gmail.com',
    username: 'oxy',
    avatar_url: 'https://i.imgur.com/hagmaYS.jpeg',
  },
  'linhngocbh2001@gmail.com': {
    email: 'linhngocbh2001@gmail.com',
    username: 'mandoo',
    avatar_url: 'https://www.w3schools.com/w3css/img_lights.jpg',
  },
};

let usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default usersReducer;
