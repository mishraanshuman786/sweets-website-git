
const user=process.env.DB_USER;
const password=process.env.DB_PASSWORD;

export const connectionSrc="mongodb+srv://"+user+":"+password+"@cluster0.pa8gzbi.mongodb.net/sweetsdb?retryWrites=true&w=majority";
