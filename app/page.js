'use client';

import { useEffect, useState } from 'react';
import Cursor from '@/components/Cursor';
import Loader from '@/components/Loader';
import ScrollProgress from '@/components/ScrollProgress';
import Nav from '@/components/Nav';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Lock scroll until the loader has finished.
  useEffect(() => {
    if (loaded) document.documentElement.style.overflow = '';
  }, [loaded]);

  return (
    <>
      <Cursor />
      <Loader onDone={() => setLoaded(true)} />
      <ScrollProgress />
      <Nav />

      {/* Native scroll — reliable with IntersectionObserver reveals. */}
      <main>
        <Hero ready={loaded} />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
