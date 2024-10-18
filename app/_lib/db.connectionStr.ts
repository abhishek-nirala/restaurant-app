const {DB_NAME} = process.env

export const connectionStr = `mongodb://127.0.0.1:27017/${DB_NAME}`

