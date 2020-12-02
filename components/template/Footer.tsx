import React from "react";
import PageContainer from "./PageContainer";
import Title from "../atoms/Title";
import Divider from "../atoms/Divider";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const enlacesDeInteres = [
    ["Aviso Legal", "/aviso-legal"],
    ["Politica de privacidad", "/politica-de-privacidad"],
    ["Politica de cookies", "/politica-de-cookies"],
    ["Contacto", "/contacto"],
  ];
  const columnStyle = `w-full md:w-1/3 space-y-2`;
  return (
    <footer className=" bg-gray-900 text-white">
      <PageContainer>
        <div className="flex flex-wrap">
          <div className={columnStyle}>
            <Image
              src="/logo.svg"
              alt="TraspasaTuCoche.com - Traspasos de vehiculos online"
              width={275}
              height={30}
            />
            <Title size={3} color="text-white">
              Links
            </Title>
            <Divider />
          </div>
          <div className={columnStyle}>
            <Title size={3} color="text-white">
              Enlaces de interes
            </Title>
            <Divider />
            <ul className="list-none space-y-1">
              {enlacesDeInteres.map((item, i) => (
                <li key={"list" + i}>
                  <Link href={item[1]}>
                    <a href={item[1]}>{item[0]}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={columnStyle}>
            <a href="https://stories.freepik.com/home">
              Illustration by Freepik Stories
            </a>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
