const express = require('express');
const cors = require('cors');
const app = express();
const bankRoutes = require('./routes/bank');

app.use(cors({
    origin:'http://localhost:5174',
    credentials:true
}));
app.use(express.json());
app.use('/api', bankRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
