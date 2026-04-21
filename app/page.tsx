import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Specials from "@/components/specials";
import Deli from "@/components/deli";
import Hours from "@/components/hours";
import About from "@/components/about";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Specials />
        <Deli />
        <Hours />
        <About />
      </main>
      <Footer />
    </>
  );
}
