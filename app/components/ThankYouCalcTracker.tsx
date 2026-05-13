"use client";

import { useEffect } from "react";

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

export default function ThankYouCalcTracker() {
  useEffect(() => {
    const dataLayerWindow = window as DataLayerWindow;
    dataLayerWindow.dataLayer = dataLayerWindow.dataLayer || [];
    dataLayerWindow.dataLayer.push({
      event: "thank_you_calc_page",
    });
  }, []);

  return null;
}
