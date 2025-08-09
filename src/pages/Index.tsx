import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GlobalLoadingWrapper from "@/components/GlobalLoadingWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <GlobalLoadingWrapper>
      <motion.div
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <section id="home">
          <Hero />
        </section>
        <ScrollReveal animation="slide-up" threshold={0.2}>
          <section id="about">
            <About />
          </section>
        </ScrollReveal>
        
        <ScrollReveal animation="slide-up" threshold={0.2} delay={0.1}>
          <section id="skills">
            <Skills />
          </section>
        </ScrollReveal>
        
        <ScrollReveal animation="slide-up" threshold={0.2} delay={0.2}>
          <section id="projects">
            <Projects />
          </section>
        </ScrollReveal>
        
        <ScrollReveal animation="slide-up" threshold={0.2} delay={0.3}>
          <section id="contact">
            <Contact />
          </section>
        </ScrollReveal>
        <ScrollReveal animation="fade" threshold={0.1} delay={0.4}>
          <Footer />
        </ScrollReveal>
      </motion.div>
    </GlobalLoadingWrapper>
  );
};

export default Index;
