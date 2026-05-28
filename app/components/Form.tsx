"use client";
import React, { useState } from "react";
import { sumbitForm } from "../actions/server";
import about from "@images/Rectangle 1294.png";
import { useRef } from "react";
import { useRouter } from 'next/navigation'


interface Props {
  children: React.ReactNode;
  withKitchen: boolean;
  buttonClassName?: string; // For button styling
  kitchenId?: string;
  kitchenImage?: string;
}

function Form({
  withKitchen = false,
  children,
  buttonClassName = "",
  kitchenId,
  kitchenImage,
}: Props) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const hidePopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      setShow(false);
      }
  };

  const togglePopup = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <>

      <button className={buttonClassName} onClick={togglePopup}>
        {children}
      </button>

      <div
        className={`form_popup ${show ? "visible" : ""}`}
        onClick={hidePopup}
      >
        <form
          ref={ref}
          action={async (formData) => {
            await sumbitForm(formData);
            ref.current?.reset();
          }}
          className={`form_popup-content`}
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            setShow(!show);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
          event: 'thank-you_page'
          });
            router.push('/thank-you');
          }}
        >
          <div className="form-image">
            {withKitchen ? (
              <img
                alt={kitchenId as string}
                src={kitchenImage as string}
              />
            ) : (
              <img alt="" src={about.src} />
            )}
          </div>
          <div className="form-container">
            {withKitchen ? (
              <p>Bucătăria {kitchenId}</p>
            ) : (
              <p>Completează formularul</p>
            )}
            <input required name="name" type="text" placeholder="Numele" />
            <input required name="tel" type="text" placeholder="Telefonul" />
            {withKitchen && (
              <input
                style={{ display: "none" }}
                disabled
                value={kitchenId}
                name="kitchen"
                type="text"
                placeholder="Bucatarie"
              />
            )}
            <button type="submit">Trimite</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
