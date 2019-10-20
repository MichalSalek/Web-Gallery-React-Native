import http from '../services/http.service';
export default () => {
   return http.get('https://google.com').then((res) => {
        console.log(res)
    }). catch((error) => {
       console.log(error)
    })
}