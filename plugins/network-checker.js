import axios from "axios";

// Simply network connection checker
export default async () => {
    let isInternet = false;
    await axios('http://www.google.com', {
        method: 'GET',
    }).then(() => {
        console.log("Internet works");
        isInternet = true;
    }).catch((error) => {
        console.log("Internet connection failed");
    });
    return isInternet
}