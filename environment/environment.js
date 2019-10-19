const prod = {
    apiUrl: '',
}
const dev = {
    apiUrl: 'https://api.unsplash.com/',
}

export const env = process.env.NODE_ENV === 'development' ? dev : prod
