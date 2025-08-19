import dotenv from 'dotenv';
import { createServer } from './server';

dotenv.config();

const port = parseInt(process.env.PORT || '4000', 10);

const app = createServer();

app.listen(port, () => {
  console.log(`[backend] Server listening on http://localhost:${port}`);
});
