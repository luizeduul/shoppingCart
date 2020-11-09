import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3490'
});

export default Api;
