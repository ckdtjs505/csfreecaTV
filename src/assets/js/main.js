import "@babel/polyfill";
import "../css/styles.css";
import LivePlayer from "./videoPlayers";
import "./upload";
import "./addComment";
import "./home";

window.livePlayer = new LivePlayer();
