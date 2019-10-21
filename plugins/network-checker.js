import axios from "axios";

// Simply network connection checker
export default async () => {
    let isInternet = false;
    await axios('http://www.google.com', {
        method: 'GET',
    }).then(() => {
        isInternet = true;
    }).catch((error) => {
        isInternet = false;
    });
    return isInternet
}