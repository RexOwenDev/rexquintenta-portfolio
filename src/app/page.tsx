import AnimationInit from '@/components/animation-init';
import Nav from '@/components/nav';
import Hero from '@/components/hero';
import Work from '@/components/work';
import Skills from '@/components/skills';
import About from '@/components/about';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <AnimationInit />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
