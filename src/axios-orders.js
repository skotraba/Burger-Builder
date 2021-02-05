import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-42f8d-default-rtdb.firebaseio.com/'
})

export default instance;