import logo from "@images/Croitoru_Logo.svg";
import about from "@images/about.jpg";
import Image from "next/image";
import Form from "./Form";
import Link from "next/link";
import KitchenCalculator from "./KitchenCalculator";
import calculatorStyles from "./KitchenCalculator.module.scss";
export default function About() {
  return (
    <section className="about">
      <div className="about__content">
        <Image alt="" className="about__content-logo" src={logo} />
        <div className="about__content-text">
          <h3 className="about__content-title">
            DESCOPERĂ CELE MAI BUNE BUCĂTĂRII DIN MOLDOVA
          </h3>
          <p className="about__content-body">
            Deja peste 5000 de bucătării finisate au fost livrate și instalate
            în casele clienților noștri și în continuare menținem relații bune.
          </p>
          <div className={calculatorStyles.introActions}>
            <Form buttonClassName="intro-button">
              CONSULTAȚIE GRATUITĂ
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.96949 8.34296C10.2624 8.05007 10.7373 8.05007 11.0301 8.34296L15.0301 12.343C15.323 12.6359 15.323 13.1107 15.0301 13.4036L11.0301 17.4036C10.7373 17.6965 10.2624 17.6965 9.96949 17.4036C9.67659 17.1107 9.67659 16.6359 9.96949 16.343L13.4392 12.8733L9.96949 9.40362C9.67659 9.11073 9.67659 8.63585 9.96949 8.34296Z"
                  fill="white"
                />
              </svg>
            </Form>
            <KitchenCalculator />
          </div>
        </div>
      </div>
      <div className="about__image">
        <Image alt="" className="about__content-logo" src={about} />
      </div>
    </section>
  );
}
