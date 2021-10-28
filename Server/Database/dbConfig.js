import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// 업데이트되고 사용 안하는 설정
// mongoose.set('useFindAndModify', false); // mongoose가 제공하는 함수를 사용하기 위한 set
// mongoose.set('useCreateIndex', true); // mongoose 필요없는 경고 메세지 제거
// mongoose.set('useUnifiedTopology', true); // mongoose 필요없는 경고 메세지 제거

const dbConnect = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Connected to the database!');
        })
        .catch((e) => {
            console.error('Database Connection error', e.message);
        });

    mongoose.connection.on('error', (error) => {
        console.log('Database Connection error', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Database Connection error, try to reconnect');
        dbConnect();
    });
};

export default dbConnect;