/* eslint-disable @next/next/no-img-element */
import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <section id="footer">
    <footer className="w-full pt-20 pb-10" id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          ¿Listo para llevar tu presencia digital al siguiente nivel?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Comunícate conmigo para discutir como puedo ayudarte a cumplir tus metas.
        </p>
        <a href="mailto:isamorenoc08@gmail.com">
          <MagicButton
            title="Comunícate conmigo"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Isabel Moreno
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
            key={info.id}
            href={info.link}  // Usar el enlace desde el objeto socialMedia
            target="_blank"  // Abre el enlace en una nueva pestaña
            rel="noopener noreferrer"  // Añade seguridad para los enlaces externos
            className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
          >
              <img src={info.img} alt="icons" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
    </section>
  );
};

export default Footer;