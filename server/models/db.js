const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(conn.connection.host);
};
module.exports = connectDB;
