import { getKitchensData } from "@//actions/get_kitchens";
import Recomended from "@//components/Recomended";
import Testimonials from "@//components/Testimonials";
import About from "@//components/About.jsx";
import ThankYouCalcTracker from "@//components/ThankYouCalcTracker";
import { GoogleTagManager } from "@next/third-parties/google";

export default async function ThankYouCalcPage() {
  const { kitchens } = await getKitchensData();

  return (
    <>
      <ThankYouCalcTracker />
      <div style={styles.container}>
        <h1 style={styles.heading}>Multumim!</h1>
        <p style={styles.message}>
          In scurt timp unul din consultantii nostri vor reveni cu un apel.
        </p>
      </div>
      <div className="app">
        <Recomended kitchens={kitchens} />
        <Testimonials />
        <About />
        <GoogleTagManager gtmId="GTM-N86LVST" />
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    height: "40vh",
    textAlign: "center" as const,
    backgroundColor: "#f9f9f9",
    color: "#333",
    marginBottom: "30px",
    marginTop: "20px",
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "1rem",
    marginTop: "75px",
  },
  message: {
    fontSize: "1.2rem",
    maxWidth: "650px",
    lineHeight: "1.5",
  },
};
