const path = require('path');
const express = require('express')


const public = path.join(__dirname, '../public');
const app = express();

app.use(express.static(public))






app.listen(3000, () => console.log('server is up on port 3000'))