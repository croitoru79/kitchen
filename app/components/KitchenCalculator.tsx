"use client";

import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  budget: string;
  details: string;
};

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

const shapeOptions: Choice[] = [
  { label: "Tip Drept", image: step1TipDrept, planImage: step1PlanTipDrept },
  { label: "Tip L", image: step1TipL, planImage: step1PlanTipL, planVariant: "compact" },
  { label: "Tip U", image: step1TipU, planImage: step1PlanTipU, planVariant: "wideTall" },
  { label: "Cu Insula", image: step1Insula, planImage: step1PlanInsula, planVariant: "island" },
  { label: "Cu Blat tip bar", image: step1BlatBar, planImage: step1PlanBlatBar, planVariant: "bar" },
  { label: "Nu stiu, am nevoie de ajutor", image: step3Help },
];

const materialOptions: Choice[] = [
  { label: "PAL", image: step2Pal },
  { label: "MDF Plastificat", image: step2MdfPlastificat },
  { label: "MDF Vopsit", image: step2MdfVopsit },
  { label: "Sticla", image: step2Sticla },
  { label: "Fatade Combinate", image: step2FatadeCombinate },
];

const countertopOptions: Choice[] = [
  { label: "PAL", image: step3Pal },
  { label: "Placa Compacta", image: step3PlacaCompacta },
  { label: "Piatra Artificiala", image: step3PiatraArtificiala },
  { label: "Piatra Naturala", image: step3PiatraNaturala },
  { label: "Nu stiu, am nevoie de ajutor", image: helpOption },
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
  budget: "pana la 50.000",
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

export default function KitchenCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CalculatorState>(initialState);
  const router = useRouter();
  const sidebarChoice =
    step === 1
      ? form.shape
      : step === 2
        ? form.material
        : step === 3
          ? form.countertop
          : [form.length && `${form.length}m`, form.width && `${form.width}m`, form.style, form.budget].filter(Boolean).join(" / ");
  const selectedShapeImage = shapeOptions.find((choice) => choice.label === form.shape)?.image;
  const selectedMaterialImage = materialOptions.find((choice) => choice.label === form.material)?.image;
  const selectedCountertopImage = countertopOptions.find((choice) => choice.label === form.countertop)?.image;
  const sidebarCurrentImage =
    step === 1
      ? selectedShapeImage
      : step === 2
        ? selectedMaterialImage
        : step === 3
          ? selectedCountertopImage
          : selectedCountertopImage || selectedMaterialImage || selectedShapeImage;

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
      calculator_budget: form.budget,
      ...extra,
    });
  };

  const updateField = <T extends keyof CalculatorState>(field: T, value: CalculatorState[T]) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
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
    if (!form.length.trim() || !form.width.trim() || !form.drawers.trim()) {
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
        className={styles.open}
        type="button"
        onClick={() => {
          pushCalculatorEvent("calculator_open", { calculator_step: 1 });
          setIsOpen(true);
        }}
      >
        <span className={styles.openIcon} aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4.5 4H9.5M4.5 6.5H5.5M7 6.5H8M9.5 6.5H10M4.5 9H5.5M7 9H8M9.5 9H10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
        CALCULATOR DE PRETURI
      </button>

      {isOpen && (
        <div className={styles.popup} role="dialog" aria-modal="true" aria-labelledby="calculator-title">
          <div className={styles.backdrop} onClick={close} />
          <div className={styles.modal}>
            <aside className={styles.side}>
              <Image className={styles.sideImage} src={sidebarCurrentImage || sidebarImage} alt="Bucatarie Croitoru" fill priority />
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
                  <h2 id="calculator-title">Calculeaza Pretul Bucatariei</h2>
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
                    <h3>Forma dorita a bucatariei</h3>
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
                    <h3>Cunoasteti din ce material doriti sa fie bucataria?</h3>
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
                    <h3>Alegeti blatul</h3>
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
                    <h3>Dimensiunile Bucatariei</h3>
                    <div className={styles.fieldsRow}>
                      <label>
                        Lungime, m
                        <input
                          required
                          value={form.length}
                          onChange={(event) => updateField("length", event.target.value)}
                          placeholder="ex. 3.2"
                        />
                      </label>
                      <label>
                        Latime, m
                        <input
                          required
                          value={form.width}
                          onChange={(event) => updateField("width", event.target.value)}
                          placeholder="ex. 3.2"
                        />
                      </label>
                      <label>
                        Numar de sertare
                        <input
                          required
                          value={form.drawers}
                          onChange={(event) => updateField("drawers", event.target.value)}
                          placeholder="ex. 8"
                        />
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
                    <div className={`${styles.fieldsRow} ${styles.fieldsRowTwo}`}>
                      <label>
                        Stil
                        <select value={form.style} onChange={(event) => updateField("style", event.target.value)}>
                          <option>Modern</option>
                          <option>Clasic</option>
                          <option>Minimalist</option>
                          <option>Scandinav</option>
                        </select>
                      </label>
                      <label>
                        Buget
                        <select value={form.budget} onChange={(event) => updateField("budget", event.target.value)}>
                          <option>pana la 50.000</option>
                          <option>50.000 - 80.000</option>
                          <option>80.000 - 120.000</option>
                          <option>peste 120.000</option>
                        </select>
                      </label>
                    </div>
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
                  Inapoi
                </button>
                {step < 4 ? (
                  <button className={styles.next} type="button" onClick={goNext}>
                    Continua
                    <span aria-hidden="true">-&gt;</span>
                  </button>
                ) : (
                  <button className={styles.next} type="button" onClick={finish}>
                    Finiseaza
                  </button>
                )}
              </footer>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
