const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DB;

export const dbConnection = {
  url: `mongodb+srv://${username}:${password}@${host}${
    port ? `:${port}` : ''
  }/${database}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
