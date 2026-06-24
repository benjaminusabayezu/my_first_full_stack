import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const imageRef = useRef(null);
  const lineRef = useRef(null);


  const starRef=useRef([])

useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.6 },
    )
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.3",
      )
      .fromTo(
        bioRef.current,
        { y: 30, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
        "-=0.4",
      )
      .fromTo(
        imageRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=0.7",
      );

    // ⭐ stars animation INSIDE context
    starRef.current.forEach((star, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.5 + Math.random() * 0.5;

      gsap.to(star, {
        x: direction * (100 + index * 20),
        y: direction * (-50 - index * 10),
        rotation: direction * 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: speed,
        },
      });
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  const addToStars = (el) =>{
    if(el && !starRef.current.includes(el)){
      starRef.current.push(el)
    }
  }

  return (
    <section id="about"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-b
        from-zinc-800 via-zinc-900 to-lime-950 flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden">

        {[...Array(10)].map((_,i) =>(
          <div
          
          ref={addToStars}
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${2 +i *3}px`,
            height:`${2 + i *3}px`,
            backgroundColor: "white",
            opacity:0.2 + Math.random() * 0.4,
            top:`${Math.random() *100}%`,
            left:`${Math.random() *100}%`,
          }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-24 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left — text content */}
          <div className="flex-1 max-w-xl">
            {/* Decorative line */}
            <div
              ref={lineRef}
              className="w-12 h-0.5 bg-lime-400 mb-6"
              style={{ transformOrigin: "left center" }}
            />

            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold text-lime-600 mb-8 leading-tight"
            >
              About Me
            </h1>

            <p
              ref={bioRef}
              className="text-base md:text-lg text-zinc-400 leading-relaxed tracking-wide"
            >
              I&apos;m a software developer passionate about building modern web
              applications and learning new technologies. I enjoy working with
              React, Tailwind CSS, Node.js, Django, and PostgreSQL to create
              responsive, user-friendly, and reliable solutions. I am constantly
              improving my skills through projects, research, and hands-on
              experience in software development and testing.
            </p>
          </div>

          {/* Right — profile image */}
          <div className="flex-shrink-0">
            <img
              ref={imageRef}
              src="images/profile.png"
              alt="Profile"
              className="h-72 md:h-96 lg:h-[28rem] object-cover mix-blend-lighten"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
