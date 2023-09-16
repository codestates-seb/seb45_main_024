import { FC, useEffect, useState } from "react";
import zeplin from "../../../assets/tech/zeplin.svg";

interface GetLogoProp {
  logoTitle: string;
}

const GetLogo: FC<GetLogoProp> = ({ logoTitle }) => {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  let logoName = logoTitle.toLowerCase();

  // 예외: vuejs, amazonwebservices
  if (logoName === "vue") {
    logoName = "vuejs";
  } else if (logoName === "aws") {
    logoName = "amazonwebservices";
  } else if (logoName === "reactnative") {
    logoName = "react";
  }

  useEffect(() => {
    if (logoName === "zeplin") {
      setLogoSrc(zeplin);
      return;
    }

    const originalURL = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoName}/${logoName}-original.svg`;
    const plainURL = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoName}/${logoName}-plain.svg`;

    fetch(originalURL)
      .then((res) => {
        if (res.status === 200) {
          setLogoSrc(originalURL);
        } else {
          setLogoSrc(plainURL);
        }
      })
      .catch((err) => {
        console.info("Error fetching the logo:", err);
        setLogoSrc(plainURL);
      });
  }, [logoName]);

  return <>{logoSrc && <img src={logoSrc} alt={`${logoTitle} logo`} />}</>;
};

export default GetLogo;
