import axios from 'axios'
import { getToken } from './token'


// base URL set up
const request = axios.create({
  baseURL: 'https://geek.itheima.net/v1_0',
  timeout: 5000
})


/*
Add request interceptors to intercept requests before they are sent, 
allowing for the insertion of custom configurations.
*/

request.interceptors.request.use((config)=> {
    // modify this config to take in token data
    const token = getToken()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// processing returned data
request.interceptors.response.use((response)=> {
    return response.data
  }, (error)=> {
    return Promise.reject(error)
})

export { request }