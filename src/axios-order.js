import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-app-a345c.firebaseio.com/'
});

export default instance;
