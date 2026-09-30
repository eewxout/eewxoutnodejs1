require('dotenv').config();
const app = require('./src/app');
const seed = require('./src/seed');

seed();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
