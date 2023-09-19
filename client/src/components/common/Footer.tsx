import { FC } from "react";
import CircleLogo from "./Logo/circleLogo";
import classes from "./Footer.module.css";

const Footer: FC = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.inFooter}>
        <div className={classes.logo}>
          <CircleLogo />
        </div>
        <ul className={classes.content}>
          <li>
            <p>
              FE : 김동준(VL), 백소원, 최지우
              <br />
              BE : 김재희(TL), 김지원, 이호준
            </p>
          </li>
          <li>Copyright 2023. 팀 블루베리스무디. all rights reserved.</li>
          <li>
            <a
              href="https://github.com/codestates-seb/seb45_main_024"
              target="_blank"
            >
              https://github.com/codestates-seb/seb45_main_024
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
