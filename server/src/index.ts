import dotenv from 'dotenv';
dotenv.config();
import { Server } from './server';

new Server()
  .listen(port => {
    console.log(`server running on port : ${port}`);
  });
