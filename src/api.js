const isProduction = window.location.hostname !== 'localhost';
export const API_URL = isProduction 
    ? 'https://apujo.pythonanywhere.com' 
    : 'http://127.0.0.1:5000';
