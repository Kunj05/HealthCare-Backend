const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const serviceRoutes = require('./routes/serviceRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
connectDB();

app.get('/',(req,res)=>{
    res.json({
        mssg:"Hello from the server",
    })
})
app.use('/api/v1/services', serviceRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
