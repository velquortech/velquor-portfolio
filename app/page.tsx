import { Nav }          from "./components/layout/Nav";
import { Footer }       from "./components/layout/Footer";
import { Hero }         from "./components/sections/hero/Hero";
import { Services }     from "./components/sections/services/Services";
import { Work }         from "./components/sections/work/Work";
import { Process }      from "./components/sections/process/Process";
import { TechStack }    from "./components/sections/tech-stack/TechStack";
import { Testimonials } from "./components/sections/testimonials/Testimonials";
import { CTABand }      from "./components/sections/cta/CTABand";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <TechStack />
        <Testimonials />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
