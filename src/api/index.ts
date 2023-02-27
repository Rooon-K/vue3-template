import request from '@/utils/request';
const apiUrl = "http://127.0.0.1:3000";


const getTest = () => {
  return request.get(apiUrl + "")
}


export {
  getTest
}