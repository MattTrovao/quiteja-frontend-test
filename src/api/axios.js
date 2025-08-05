import axios from "axios";

const key = process.env.VUE_APP_ID;

const api = axios.create({
  baseURL: 'https://dummyapi.io/data/v1/',
  headers: {
    'app-id': key
  }
})

export default api