import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false); // mongoose가 제공하는 함수를 사용하기 위한 set
mongoose.set('useCreateIndex', true); // mongoose 필요없는 경고 메세지 제거
mongoose.set('useUnifiedTopology', true); // mongoose 필요없는 경고 메세지 제거

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

//  Dataformant example
// {
// "source": {
//   "id": null,
//   "name": "Donga.com"
// },
// "author": null,
// "title": ""새 집 냄새" "주택 청약 고마워!"…이시언 아파트 공개 - 동아일보",
// "description": "배우 이시언(37)이 자신의 새 아파트를 공개했다.  이시언은 25일 방송한 MBC 예능 '나 혼자 산다'에서 정든 옛집을 떠나 새 아파트로 이사했다.  이사한 아파트에 도착한 …",
// "url": "http://news.donga.com/Main/3/all/20190126/93869524/2",
// "urlToImage": "http://dimg.donga.com/a/600/0/90/5/wps/NEWS/IMAGE/2019/01/26/93869523.2.jpg",
// "publishedAt": "2019-01-26T00:21:00Z",
// "content": null
// }
