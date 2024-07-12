import dotenv from 'dotenv';
import { app } from './controller/app/app';
import { clientRouter } from './routes/clientRouter';
import { tagRouter } from './routes/tagRouter';
import { clientTagRouter } from './routes/clientTagRouter';
dotenv.config();

app.use("/client", clientRouter);
app.use("/tag", tagRouter);
app.use("/client_tag", clientTagRouter);