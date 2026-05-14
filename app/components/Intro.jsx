import logo from "@images/Croitoru_Logo.svg";
import cover from "@images/Img-225.jpg";
import Image from "next/image";
import IntroActions from "./IntroActions";

export default function Intro() {
  return (
    <section className="intro">
      <Image className="intro__video" src={cover} alt="" />
      <video className="intro__video video_none" muted loop src="videos/Bucatarii_Background.mp4" />
      <div className="intro-content">
        <Image className="intro-logo" src={logo} alt="Croitoru kitchen solutions" />
        <IntroActions />
      </div>
    </section>
  );
}
