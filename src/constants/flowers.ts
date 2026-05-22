import canationPink from "../assets/flowers/canationPink.svg";
import gerbaraBlue from "../assets/flowers/gerbaraBlue.svg";
import gerbaraPink from "../assets/flowers/gerbaraPink.svg";
import gerbaraYellow from "../assets/flowers/gerbaraYellow.svg";
import lavenderPurple from "../assets/flowers/lavenderPurple.svg";
import tulipRed from "../assets/flowers/tulipRed.svg";
import tulipYellow from "../assets/flowers/tulipYellow.svg";
import lisianthusPink from "../assets/flowers/LisianthusPink.svg";
import lisianthusPurple from "../assets/flowers/LisianthusPurple.svg";
import pomponBlue from "../assets/flowers/PomponBlue.svg";
import pomponYellow from "../assets/flowers/pomponYellow.svg";
import roseBlack from "../assets/flowers/roseBlack.svg";
import roseBlue from "../assets/flowers/roseBlue.svg";
import rosePink from "../assets/flowers/rosePink.svg";
import roseRed from "../assets/flowers/roseRed.svg";
import roseWhite from "../assets/flowers/roseWhite.svg";
import { FlowerItem } from "../types/flowers";

export const flowers: Record<string, FlowerItem[]> = {
  장미: [
    { image: roseRed, type: "ROSE", color: "RED" },
    { image: rosePink, type: "ROSE", color: "PINK" },
    { image: roseWhite, type: "ROSE", color: "WHITE" },
    { image: roseBlue, type: "ROSE", color: "BLUE" },
    { image: roseBlack, type: "ROSE", color: "BLACK" },
  ],
  튤립: [
    { image: tulipRed, type: "TULIP", color: "RED" },
    { image: tulipYellow, type: "TULIP", color: "YELLOW" },
  ],
  거베라: [
    { image: gerbaraPink, type: "GERBERA", color: "PINK" },
    { image: gerbaraYellow, type: "GERBERA", color: "YELLOW" },
    { image: gerbaraBlue, type: "GERBERA", color: "BLUE" },
  ],
  리시안셔스: [
    { image: lisianthusPink, type: "LISIANTHUS", color: "PINK" },
    { image: lisianthusPurple, type: "LISIANTHUS", color: "PURPLE" },
  ],
  폼폼국화: [
    { image: pomponBlue, type: "POMPON", color: "BLUE" },
    { image: pomponYellow, type: "POMPON", color: "YELLOW" },
  ],
  라벤더: [{ image: lavenderPurple, type: "LAVENDER", color: "PURPLE" }],
  카네이션: [{ image: canationPink, type: "CARNATION", color: "PINK" }],
};