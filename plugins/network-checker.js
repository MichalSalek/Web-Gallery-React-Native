import axios from "axios";

export default () => {

    axios('http://google.com', {
        method: 'GET',
    }).then((res) => {
        console.log("then works");
        console.log(res);
    }). catch((error) => {
        console.log(error);
    })
}