const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/connection')
const authRoute = require('./routes/authRoutes');
const campaignRoute = require('./routes/campaignRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/campaign', campaignRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
