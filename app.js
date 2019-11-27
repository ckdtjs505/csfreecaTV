import express from 'express';
import morgan  from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();
const handleHome = (req, res) => res.send('hello from home');
const handleProfile = ( req,res ) => res.send("you are on my profile");

app.use(cookieParser());
app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded( { extended: true }));
app.use(helmet());
app.use(morgan('dev'));

app.get("/",handleHome);
app.get("/profile", handleProfile);

export default app;