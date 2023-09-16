import { FC, useEffect, useState } from "react";

interface GetLogoProp {
  logoTitle: string;
}

const GetLogo: FC<GetLogoProp> = ({ logoTitle }) => {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const logoName = logoTitle.toLowerCase();

  useEffect(() => {
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
