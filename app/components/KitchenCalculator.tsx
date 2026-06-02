"use client";

import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PhoneInput, { isValidPhoneNumber, type Value } from "react-phone-number-input";
import logo from "@images/Croitoru_Logo.svg";
import sidebarImage from "@images/calculator/sidebar.png";
import step1TipDrept from "@images/calculator/step1-tip-drept.png";
import step1TipL from "@images/calculator/step1-tip-l.png";
import step1TipU from "@images/calculator/step1-tip-u.png";
import step1Insula from "@images/calculator/step1-insula.png";
import step1BlatBar from "@images/calculator/step1-blat-bar.png";
import step1PlanTipDrept from "@images/calculator/step1-plan-tip-drept.png";
import step1PlanTipL from "@images/calculator/step1-plan-tip-l.png";
import step1PlanTipU from "@images/calculator/step1-plan-tip-u.png";
import step1PlanInsula from "@images/calculator/step1-plan-insula.png";
import step1PlanBlatBar from "@images/calculator/step1-plan-blat-bar.png";
import step2Pal from "@images/calculator/step2-pal.png";
import step2MdfPlastificat from "@images/calculator/step2-mdf-plastificat.png";
import step2MdfVopsit from "@images/calculator/step2-mdf-vopsit.png";
import step2Sticla from "@images/calculator/step2-sticla.png";
import step2FatadeCombinate from "@images/calculator/step2-fatade-combinate.png";
import step3Pal from "@images/calculator/step3-pal.png";
import step3PlacaCompacta from "@images/calculator/step3-placa-compacta.png";
import step3PiatraArtificiala from "@images/calculator/step3-piatra-artificiala.png";
import step3PiatraNaturala from "@images/calculator/step3-piatra-naturala.png";
import step3Help from "@images/calculator/step3-help.png";
import helpOption from "@images/calculator/help-option.png";
import { submitCalculatorForm } from "../actions/server";
import styles from "./KitchenCalculator.module.scss";

type Choice = {
  label: string;
  image?: StaticImageData;
  planImage?: StaticImageData;
  planVariant?: "compact" | "wideTall" | "island" | "bar";
  sidebarContain?: boolean;
};

type CalculatorState = {
  shape: string;
  material: string;
  countertop: string;
  length: string;
  width: string;
  drawers: string;
  hasAppliances: boolean;
  style: string;
  phone: string;
  details: string;
};

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

type KitchenCalculatorProps = {
  buttonClassName?: string;
  compact?: boolean;
  label?: string;
};

const shapeOptions: Choice[] = [
  { label: "Tip Drept", image: step1TipDrept, planImage: step1PlanTipDrept },
  { label: "Tip L", image: step1TipL, planImage: step1PlanTipL, planVariant: "compact" },
  { label: "Tip U", image: step1TipU, planImage: step1PlanTipU, planVariant: "wideTall" },
  { label: "Cu Insulă", image: step1Insula, planImage: step1PlanInsula, planVariant: "island" },
  { label: "Cu Blat tip bar", image: step1BlatBar, planImage: step1PlanBlatBar, planVariant: "bar" },
  { label: "Nu știu, am nevoie de ajutor", image: step3Help, sidebarContain: true },
];

const materialOptions: Choice[] = [
  { label: "PAL", image: step2Pal },
  { label: "MDF Plastificat", image: step2MdfPlastificat },
  { label: "MDF Vopsit", image: step2MdfVopsit },
  { label: "Sticlă", image: step2Sticla },
  { label: "Fațade Combinate", image: step2FatadeCombinate },
];

const countertopOptions: Choice[] = [
  { label: "PAL", image: step3Pal },
  { label: "Placă Compactă", image: step3PlacaCompacta },
  { label: "Piatră Artificială", image: step3PiatraArtificiala },
  { label: "Piatră Naturală", image: step3PiatraNaturala },
  { label: "Nu știu, am nevoie de ajutor", image: helpOption, sidebarContain: true },
];

const initialState: CalculatorState = {
  shape: "Tip Drept",
  material: "PAL",
  countertop: "PAL",
  length: "",
  width: "",
  drawers: "",
  hasAppliances: false,
  style: "Modern",
  phone: "",
  details: "",
};

function HelpPlan() {
  return (
    <div className={styles.helpPlan} aria-hidden="true">
      <div className={styles.helpPlanShape}>
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.helpPlanMark}>?</div>
      <div className={styles.helpPlanChairs}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true">
      <path d="M1 5L4.5 8.5L12 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChoiceCard({
  choice,
  selected,
  onSelect,
}: {
  choice: Choice;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button className={`${styles.card} ${selected ? styles.selected : ""}`} type="button" onClick={onSelect} aria-pressed={selected}>
      <span className={styles.cardRadio}>{selected && <CheckIcon />}</span>
      <span className={styles.cardMedia}>
        {choice.image ? <Image src={choice.image} alt={choice.label} /> : <HelpPlan />}
        {choice.planImage && (
          <span
            className={`${styles.planBadge} ${choice.planVariant === "compact" ? styles.planBadgeCompact : ""} ${
              choice.planVariant === "wideTall" ? styles.planBadgeWideTall : ""
            } ${choice.planVariant === "island" ? styles.planBadgeIsland : ""} ${
              choice.planVariant === "bar" ? styles.planBadgeBar : ""
            }`}
          >
            <Image src={choice.planImage} alt="" />
          </span>
        )}
      </span>
      <span className={styles.cardLabel}>{choice.label}</span>
    </button>
  );
}

export default function KitchenCalculator({
  buttonClassName,
  compact = false,
  label = "CALCULATOR DE PREȚURI",
}: KitchenCalculatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CalculatorState>(initialState);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const router = useRouter();
  const sidebarChoice =
    step === 1
      ? form.shape
      : step === 2
        ? form.material
        : step === 3
          ? form.countertop
          : [form.length && `${form.length}m`, form.width && `${form.width}m`, form.style, form.phone].filter(Boolean).join(" / ");
  const selectedShapeImage = shapeOptions.find((choice) => choice.label === form.shape)?.image;
  const selectedMaterialImage = materialOptions.find((choice) => choice.label === form.material)?.image;
  const selectedCountertopImage = countertopOptions.find((choice) => choice.label === form.countertop)?.image;
  const selectedShapeContain = shapeOptions.find((choice) => choice.label === form.shape)?.sidebarContain;
  const selectedCountertopContain = countertopOptions.find((choice) => choice.label === form.countertop)?.sidebarContain;
  const sidebarCurrentImage =
    step === 1
      ? selectedShapeImage
      : step === 2
        ? selectedMaterialImage
        : step === 3
          ? selectedCountertopImage
          : selectedCountertopImage || selectedMaterialImage || selectedShapeImage;
  const sidebarShouldContain =
    (step === 1 && selectedShapeContain) ||
    (step === 3 && selectedCountertopContain) ||
    (step === 4 && selectedCountertopContain);
  const isPhoneValid = form.phone ? isValidPhoneNumber(form.phone) : false;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    pushCalculatorEvent("calculator_close");
    setIsOpen(false);
  };

  const pushCalculatorEvent = (event: string, extra: Record<string, unknown> = {}) => {
    if (typeof window === "undefined") {
      return;
    }

    const dataLayerWindow = window as DataLayerWindow;
    dataLayerWindow.dataLayer = dataLayerWindow.dataLayer || [];
    dataLayerWindow.dataLayer.push({
      event,
      calculator_step: step,
      calculator_shape: form.shape,
      calculator_material: form.material,
      calculator_countertop: form.countertop,
      calculator_length: form.length,
      calculator_width: form.width,
      calculator_drawers: form.drawers,
      calculator_has_appliances: form.hasAppliances,
      calculator_style: form.style,
      calculator_phone: form.phone,
      ...extra,
    });
  };

  const updateField = <T extends keyof CalculatorState>(field: T, value: CalculatorState[T]) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updatePhone = (value?: Value) => {
    setPhoneTouched(true);
    updateField("phone", value ?? "");
  };

  const selectOption = (field: "shape" | "material" | "countertop", value: string) => {
    const trackingField =
      field === "shape" ? "calculator_shape" : field === "material" ? "calculator_material" : "calculator_countertop";

    updateField(field, value);
    pushCalculatorEvent(`calculator_step_${step}_select`, {
      calculator_field: field,
      calculator_selected_option: value,
      [trackingField]: value,
    });
  };

  const goBack = () => {
    setStep((current) => Math.max(1, current - 1));
  };

  const goNext = () => {
    pushCalculatorEvent(`calculator_step_${step}_continue`);
    setStep((current) => Math.min(4, current + 1));
  };

  const finish = async () => {
    setPhoneTouched(true);
    if (!isPhoneValid) {
      pushCalculatorEvent("calculator_finish_validation_error");
      return;
    }

    pushCalculatorEvent("calculator_finish");
    await submitCalculatorForm(form);
    setIsOpen(false);
    router.push("/thank_you_calc");
  };

  return (
    <>
      <button
        className={[styles.open, compact ? styles.openCompact : "", buttonClassName].filter(Boolean).join(" ")}
        type="button"
        onClick={() => {
          pushCalculatorEvent("calculator_open", { calculator_step: 1 });
          setIsOpen(true);
        }}
      >
        <span className={styles.openIcon} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              opacity="0.5"
              d="M10 18.3333C6.46417 18.3333 4.69667 18.3333 3.59833 17.1125C2.5 15.8933 2.5 13.9283 2.5 9.99996C2.5 6.07163 2.5 4.10746 3.59833 2.88663C4.69667 1.66579 6.465 1.66663 10 1.66663C13.535 1.66663 15.3033 1.66663 16.4017 2.88663C17.5 4.10829 17.5 6.07163 17.5 9.99996C17.5 13.9283 17.5 15.8925 16.4017 17.1125C15.3033 18.3325 13.535 18.3333 10 18.3333Z"
              fill="currentColor"
            />
            <path
              d="M12.5002 5H7.50016C7.11266 5 6.91933 5 6.76016 5.0425C6.54839 5.09933 6.35528 5.21086 6.20024 5.36591C6.04519 5.52095 5.93366 5.71406 5.87683 5.92583C5.8335 6.08667 5.8335 6.28 5.8335 6.66667C5.8335 7.05333 5.8335 7.2475 5.876 7.40667C5.93282 7.61844 6.04436 7.81155 6.1994 7.96659C6.35445 8.12164 6.54755 8.23317 6.75933 8.29C6.92016 8.33333 7.1135 8.33333 7.50016 8.33333H12.5002C12.8877 8.33333 13.081 8.33333 13.2402 8.29083C13.4519 8.23401 13.645 8.12247 13.8001 7.96743C13.9551 7.81238 14.0667 7.61928 14.1235 7.4075C14.1668 7.24667 14.1668 7.05333 14.1668 6.66667C14.1668 6.28 14.1668 6.08583 14.1243 5.92667C14.0675 5.71489 13.956 5.52179 13.8009 5.36674C13.6459 5.21169 13.4528 5.10016 13.241 5.04333C13.081 5 12.8868 5 12.5002 5ZM6.66683 11.6667C6.88784 11.6667 7.0998 11.5789 7.25608 11.4226C7.41237 11.2663 7.50016 11.0543 7.50016 10.8333C7.50016 10.6123 7.41237 10.4004 7.25608 10.2441C7.0998 10.0878 6.88784 10 6.66683 10C6.44582 10 6.23385 10.0878 6.07757 10.2441C5.92129 10.4004 5.8335 10.6123 5.8335 10.8333C5.8335 11.0543 5.92129 11.2663 6.07757 11.4226C6.23385 11.5789 6.44582 11.6667 6.66683 11.6667ZM6.66683 15C6.88784 15 7.0998 14.9122 7.25608 14.7559C7.41237 14.5996 7.50016 14.3877 7.50016 14.1667C7.50016 13.9457 7.41237 13.7337 7.25608 13.5774C7.0998 13.4211 6.88784 13.3333 6.66683 13.3333C6.44582 13.3333 6.23385 13.4211 6.07757 13.5774C5.92129 13.7337 5.8335 13.9457 5.8335 14.1667C5.8335 14.3877 5.92129 14.5996 6.07757 14.7559C6.23385 14.9122 6.44582 15 6.66683 15ZM10.0002 11.6667C10.2212 11.6667 10.4331 11.5789 10.5894 11.4226C10.7457 11.2663 10.8335 11.0543 10.8335 10.8333C10.8335 10.6123 10.7457 10.4004 10.5894 10.2441C10.4331 10.0878 10.2212 10 10.0002 10C9.77915 10 9.56719 10.0878 9.41091 10.2441C9.25463 10.4004 9.16683 10.6123 9.16683 10.8333C9.16683 11.0543 9.25463 11.2663 9.41091 11.4226C9.56719 11.5789 9.77915 11.6667 10.0002 11.6667ZM10.0002 15C10.2212 15 10.4331 14.9122 10.5894 14.7559C10.7457 14.5996 10.8335 14.3877 10.8335 14.1667C10.8335 13.9457 10.7457 13.7337 10.5894 13.5774C10.4331 13.4211 10.2212 13.3333 10.0002 13.3333C9.77915 13.3333 9.56719 13.4211 9.41091 13.5774C9.25463 13.7337 9.16683 13.9457 9.16683 14.1667C9.16683 14.3877 9.25463 14.5996 9.41091 14.7559C9.56719 14.9122 9.77915 15 10.0002 15ZM13.3335 11.6667C13.5545 11.6667 13.7665 11.5789 13.9228 11.4226C14.079 11.2663 14.1668 11.0543 14.1668 10.8333C14.1668 10.6123 14.079 10.4004 13.9228 10.2441C13.7665 10.0878 13.5545 10 13.3335 10C13.1125 10 12.9005 10.0878 12.7442 10.2441C12.588 10.4004 12.5002 10.6123 12.5002 10.8333C12.5002 11.0543 12.588 11.2663 12.7442 11.4226C12.9005 11.5789 13.1125 11.6667 13.3335 11.6667ZM13.3335 15C13.5545 15 13.7665 14.9122 13.9228 14.7559C14.079 14.5996 14.1668 14.3877 14.1668 14.1667C14.1668 13.9457 14.079 13.7337 13.9228 13.5774C13.7665 13.4211 13.5545 13.3333 13.3335 13.3333C13.1125 13.3333 12.9005 13.4211 12.7442 13.5774C12.588 13.7337 12.5002 13.9457 12.5002 14.1667C12.5002 14.3877 12.588 14.5996 12.7442 14.7559C12.9005 14.9122 13.1125 15 13.3335 15Z"
              fill="currentColor"
            />
          </svg>
        </span>
        {label}
      </button>

      {isOpen && createPortal(
        <div className={styles.popup} role="dialog" aria-modal="true" aria-labelledby="calculator-title">
          <div className={styles.backdrop} onClick={close} />
          <div className={styles.modal}>
            <aside className={styles.side}>
              <Image
                className={`${styles.sideImage} ${sidebarShouldContain ? styles.sideImageContain : ""}`}
                src={sidebarCurrentImage || sidebarImage}
                alt="Bucatarie Croitoru"
                fill
                priority
              />
              <div className={styles.sideOverlay} />
              <div className={styles.sideContent}>
                <Image className={styles.logo} src={logo} alt="Croitoru kitchen solutions" />
                <div className={styles.choice}>
                  <span>Alegerea ta</span>
                  <strong>{sidebarChoice}</strong>
                </div>
              </div>
            </aside>

            <section className={styles.content}>
              <header className={styles.header}>
                <div>
                  <p className={styles.step}>Pasul {step} din 4</p>
                  <h2 id="calculator-title">Calculează Prețul Bucătăriei</h2>
                </div>
                <button className={styles.close} type="button" onClick={close} aria-label="Inchide calculatorul">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </header>
              <div className={styles.progress}>
                <span style={{ width: `${step * 25}%` }} />
              </div>

              <div className={styles.body}>
                {step === 1 && (
                  <>
                    <h3>Forma dorită a bucătăriei</h3>
                    <div className={styles.grid}>
                      {shapeOptions.map((choice) => (
                        <ChoiceCard
                          key={choice.label}
                          choice={choice}
                          selected={form.shape === choice.label}
                          onSelect={() => selectOption("shape", choice.label)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h3>Cunoașteți din ce material doriți să fie bucătăria?</h3>
                    <div className={styles.grid}>
                      {materialOptions.map((choice) => (
                        <ChoiceCard
                          key={choice.label}
                          choice={choice}
                          selected={form.material === choice.label}
                          onSelect={() => selectOption("material", choice.label)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h3>Alegeți blatul</h3>
                    <div className={styles.grid}>
                      {countertopOptions.map((choice) => (
                        <ChoiceCard
                          key={choice.label}
                          choice={choice}
                          selected={form.countertop === choice.label}
                          onSelect={() => selectOption("countertop", choice.label)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <div className={styles.fields}>
                    <h3>Dimensiunile Bucătăriei</h3>
                    <div className={styles.fieldsRow}>
                      <label>
                        Lungime, m
                        <input
                          value={form.length}
                          onChange={(event) => updateField("length", event.target.value)}
                          placeholder="ex. 3.2"
                        />
                      </label>
                      <label>
                        Latime, m
                        <input
                          value={form.width}
                          onChange={(event) => updateField("width", event.target.value)}
                          placeholder="ex. 3.2"
                        />
                      </label>
                    </div>
                    <div className={`${styles.fieldsRow} ${styles.fieldsRowTwo}`}>
                      <label>
                        Numar de sertare
                        <input
                          value={form.drawers}
                          onChange={(event) => updateField("drawers", event.target.value)}
                          placeholder="ex. 8"
                        />
                      </label>
                      <label>
                        Stil
                        <select value={form.style} onChange={(event) => updateField("style", event.target.value)}>
                          <option>Modern</option>
                          <option>Clasic</option>
                          <option>Minimalist</option>
                          <option>Scandinav</option>
                        </select>
                      </label>
                    </div>
                    <div className={styles.fieldsCheckbox}>
                      <span>Tehnica Incorporata</span>
                      <label>
                        <input
                          type="checkbox"
                          checked={form.hasAppliances}
                          onChange={(event) => updateField("hasAppliances", event.target.checked)}
                        />
                        Include
                      </label>
                    </div>
                    <h3>Informații adiționale</h3>
                    <label>
                      <span className={styles.requiredLabel}>
                        Număr de telefon <span className={styles.required}>*</span>
                      </span>
                      <PhoneInput
                        className={`${styles.phoneInput} ${phoneTouched && form.phone && !isPhoneValid ? styles.phoneInputError : ""}`}
                        defaultCountry="MD"
                        international
                        countryCallingCodeEditable={false}
                        required
                        value={form.phone as Value}
                        onChange={updatePhone}
                        onBlur={() => setPhoneTouched(true)}
                        placeholder="ex. 060896509"
                      />
                      {phoneTouched && form.phone && !isPhoneValid && (
                        <span className={styles.phoneError}>Introduceți un număr de telefon valid</span>
                      )}
                    </label>
                    <label className={styles.fieldsDetails}>
                      Detalii suplimentare
                      <textarea
                        value={form.details}
                        onChange={(event) => updateField("details", event.target.value)}
                        placeholder="Scrie detalii importante"
                      />
                    </label>
                  </div>
                )}
              </div>

              <footer className={styles.footer}>
                <button className={styles.back} type="button" onClick={goBack} disabled={step === 1}>
                  Înapoi
                </button>
                {step < 4 ? (
                  <button className={styles.next} type="button" onClick={goNext}>
                    Continuă
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M11.6667 6.66663L15 9.99996L11.6667 13.3333M15 9.99996H5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <button className={styles.next} type="button" onClick={finish} disabled={!isPhoneValid}>
                    Finisează
                  </button>
                )}
              </footer>
            </section>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
