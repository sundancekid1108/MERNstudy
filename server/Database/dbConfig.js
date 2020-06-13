require('dotenv').config();

const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);    // mongoose가 제공하는 함수를 사용하기 위한 set
mongoose.set('useCreateIndex', true);       // mongoose 필요없는 경고 메세지 제거
mongoose.set('useUnifiedTopology', true);   // mongoose 필요없는 경고 메세지 제거

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .catch(e => {console.error('Connection error', e.message)});

const db = mongoose.connection;

module.exports = db;