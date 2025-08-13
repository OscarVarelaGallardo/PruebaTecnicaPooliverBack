import express from 'express'
import cors from 'cors';
const app = express()
const port = 3000
const url ='https://jsonplaceholder.typicode.com/users'
app.use(express.json());
app.use(cors());


app.get('/users', async(req, res) => {
     try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch users, status: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
})

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message,
  });
});
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})