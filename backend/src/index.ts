import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import journalRoutes from './routes/journal';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/journals', journalRoutes);

app.get('/', (req, res) => {
  res.send('Journal API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
