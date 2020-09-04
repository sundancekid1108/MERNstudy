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

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

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