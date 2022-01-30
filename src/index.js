import "./styles/main.css";

import Game from "./components/Game/Game";
import Command from "./components/Command/Command";
import Rules from "./components/Rules/Rules";

const ATCSim = new Game();
const ATCSimRules = new Rules();
const ATCSimCommand = new Command();

ATCSim.init();
ATCSimCommand.init();
ATCSimRules.init();
