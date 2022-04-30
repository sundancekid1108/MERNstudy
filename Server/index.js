import dotenv from 'dotenv';
import router from './router';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import dbConnect from './Database/dbConfig';
import session from 'express-session';
import passport from 'passport';
import './Middleware/Passport/passport';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(morgan('combined'));
app.disable('x-powered-by');

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);

app.use((req, res, next) => {
    // CORS에 x-access-token이 추가되었습니다. jwt로 생성된 토큰은 header의 x-access-token 항목을 통해 전달
    // CORS(Cross-Origin Resource Sharing): 한 도메인에서 로드되어 다른 도메인에 있는 리소스와 상호 작용하는 클라이언트 웹 애플리케이션에 대한 방법을 정의
    // res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
    );
    next();
});

app.use(bodyParser.json());
app.use(helmet());

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

app.use(router);

//Database Connect
dbConnect();

app.listen(PORT, () => {
    console.log('Server is running on Port: ' + PORT);
});