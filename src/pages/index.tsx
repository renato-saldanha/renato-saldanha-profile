import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Home from "./Home";

export default function App() {
  return (
    <>
      <SEO />
      <StructuredData type="Person" />
      <StructuredData type="Website" />
      <Home />
    </>
  );
}
