import express from 'express';
const app = express();

const PORT = 4000;

const handleListening = () => console.log('Listening on');
const handleHome = (req, res) => res.send('hello from home');
const handleProfile = ( req,res ) => res.send("you are on my profile");

app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(PORT,handleListening );