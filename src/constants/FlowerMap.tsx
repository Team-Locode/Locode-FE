import canationPink from "../assets/flowers/canationPink.svg";
import gerbaraBlue from "../assets/flowers/gerbaraBlue.svg";
import gerbaraPink from "../assets/flowers/gerbaraPink.svg";
import gerbaraYellow from "../assets/flowers/gerbaraYellow.svg";
import lavenderPurple from "../assets/flowers/lavenderPurple.svg";
import lisianthusPink from "../assets/flowers/LisianthusPink.svg";
import lisianthusPurple from "../assets/flowers/LisianthusPurple.svg";
import pomponBlue from "../assets/flowers/PomponBlue.svg";
import pomponYellow from "../assets/flowers/pomponYellow.svg";
import roseBlack from "../assets/flowers/roseBlack.svg";
import roseBlue from "../assets/flowers/roseBlue.svg";
import rosePink from "../assets/flowers/rosePink.svg";
import roseRed from "../assets/flowers/roseRed.svg";
import roseWhite from "../assets/flowers/roseWhite.svg";

export const FLOWER_MAP: Record<string, Record<string, string>> = {
  ROSE: {
    RED: roseRed,
    PINK: rosePink,
    WHITE: roseWhite,
    BLUE: roseBlue,
    BLACK: roseBlack,
  },
  LISIANTHUS: {
    PINK: lisianthusPink,
    PURPLE: lisianthusPurple,
  },
  POMPON: {
    BLUE: pomponBlue,
    YELLOW: pomponYellow,
  },
  CARNATION: {
    PINK: canationPink,
  },
  GERBERA: {
    BLUE: gerbaraBlue,
    PINK: gerbaraPink,
    YELLOW: gerbaraYellow,
  },
  LAVENDER: {
    PURPLE: lavenderPurple,
  },
  // 서버에서 정의한 모든 type과 color를 여기에 매칭하세요.
};
