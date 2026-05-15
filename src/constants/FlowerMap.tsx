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

export const FLOWER_MAP: Record<string, Record<string, string>> = {
  ROSE: {
    RED: roseRed,
    PINK: rosePink,
    WHITE: roseWhite,
    BLUE: roseBlue,
    BLACK: roseBlack,
  },
  TULIP: {
    RED: tulipRed,
    YELLOW: tulipYellow,
  },
  LISIANTHUS: {
    PINK: lisianthusPink,
    PURPLE: lisianthusPurple,
  },
  POMPON: {
    BLUE: pomponBlue,
    YELLOW: pomponYellow,
  },
  CANATION: {
    PINK: canationPink,
  },
  GERBARA: {
    BLUE: gerbaraBlue,
    PINK: gerbaraPink,
    YEELOW: gerbaraYellow,
  },
  LAVENDER: {
    PURPLE: lavenderPurple,
  },
  // 서버에서 정의한 모든 type과 color를 여기에 매칭하세요.
};
