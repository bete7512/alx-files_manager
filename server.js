import express from 'express';

// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import router from './routes/index.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
