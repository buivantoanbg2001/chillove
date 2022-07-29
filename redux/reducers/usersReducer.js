let defaultState = {
  'buivantoanbg2001@gmail.com': {
    email: 'buivantoanbg2001@gmail.com',
    username: 'oxy',
    avatar_url: 'https://i.imgur.com/hagmaYS.jpeg',
  },
  'linhngocbh2001@gmail.com': {
    email: 'linhngocbh2001@gmail.com',
    username: 'mandoo',
    avatar_url:
      'https://tse4.mm.bing.net/th?id=OIP.O5l0ZGIhrZsoTQzGj5SZ5AHaE7&w=690&c=7&pid=Api&p=0',
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
