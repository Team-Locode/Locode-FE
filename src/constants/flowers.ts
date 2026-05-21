import canationPink from "../assets/flowers/canationPink.png";
import gerbaraBlue from "../assets/flowers/gerbaraBlue.png";
import gerbaraPink from "../assets/flowers/gerbaraPink.png";
import gerbaraYellow from "../assets/flowers/gerbaraYellow.png";
import lavenderPurple from "../assets/flowers/lavenderPurple.png";
import tulipRed from "../assets/flowers/tulipRed.png";
import tulipYellow from "../assets/flowers/tulipYellow.png";
import lisianthusPink from "../assets/flowers/LisianthusPink.png";
import lisianthusPurple from "../assets/flowers/LisianthusPurple.png";
import pomponBlue from "../assets/flowers/PomponBlue.png";
import pomponYellow from "../assets/flowers/pomponYellow.png";
import roseBlack from "../assets/flowers/roseBlack.png";
import roseBlue from "../assets/flowers/roseBlue.png";
import rosePink from "../assets/flowers/rosePink.png";
import roseRed from "../assets/flowers/roseRed.png";
import roseWhite from "../assets/flowers/roseWhite.png";
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