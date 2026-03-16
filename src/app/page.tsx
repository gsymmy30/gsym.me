"use client";

import { useRef, useEffect, useCallback, useState } from "react";

export default function Home() {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const state = useRef({
    // Rotation
    angle: 0,
    angularVel: 0.5,
    // Scale
    scale: 1,
    targetScale: 1,
    // 3D tilt (default lean for 3D look)
    tiltX: 0.6,
    tiltY: -0.5,
    targetTiltX: 0.6,
    targetTiltY: -0.5,
    defaultTiltX: 0.6,
    defaultTiltY: -0.5,
    // Mouse
    isHovering: false,
    // Drag-to-spin
    isDragging: false,
    dragStartAngle: 0,
    dragStartMouseAngle: 0,
    lastMouseAngle: 0,
    dragAngularVel: 0,
    // Particles
    particles: [] as {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      life: number;
      maxLife: number;
    }[],
  });

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = state.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    s.particles = s.particles.filter((p) => p.life > 0);

    for (const p of s.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.vx *= 0.99;
      p.life -= 1;
      const alpha = p.life / p.maxLife;
      const radius = Math.max(0, p.radius * alpha);

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.7})`;
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    let raf: number;
    const s = state.current;

    const animate = () => {
      if (!s.isDragging) {
        const baseSpeed = s.isHovering ? 1.2 : 0.5;
        s.angularVel += (baseSpeed - s.angularVel) * 0.02;
      }
      s.angle += s.isDragging ? s.dragAngularVel : s.angularVel;

      s.scale += (s.targetScale - s.scale) * 0.08;
      s.tiltX += (s.targetTiltX - s.tiltX) * 0.1;
      s.tiltY += (s.targetTiltY - s.tiltY) * 0.1;

      if (imgRef.current) {
        imgRef.current.style.transform = `
          perspective(800px)
          rotateY(${s.tiltX * 15}deg)
          rotateX(${-s.tiltY * 15}deg)
          rotate(${s.angle}deg)
          scale(${s.scale})
        `;
      }

      drawParticles();
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [drawParticles]);

  const spawnParticles = (cx: number, cy: number, count: number, force: number) => {
    const s = state.current;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = force * (0.5 + Math.random());
      s.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        radius: 3 + Math.random() * 4,
        life: 40 + Math.random() * 20,
        maxLife: 60,
      });
    }
  };

  const getMouseAngle = (e: { clientX: number; clientY: number }, rect: DOMRect) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const s = state.current;
    const rect = e.currentTarget.getBoundingClientRect();
    s.targetTiltX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    s.targetTiltY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    if (s.isDragging) {
      const mouseAngle = getMouseAngle(e, rect);
      let delta = mouseAngle - s.lastMouseAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      s.dragAngularVel = delta;
      s.angle += delta;
      s.lastMouseAngle = mouseAngle;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const s = state.current;
    const rect = e.currentTarget.getBoundingClientRect();
    s.isDragging = true;
    s.lastMouseAngle = getMouseAngle(e, rect);
    s.dragAngularVel = s.angularVel;
    handleClickDown(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const s = state.current;
    if (s.isDragging) {
      s.isDragging = false;
      s.angularVel = s.dragAngularVel;
    }
    handleClickUp(e);
  };

  const handleMouseEnter = () => {
    state.current.isHovering = true;
    state.current.targetScale = 1.05;
  };

  const handleMouseLeave = () => {
    const s = state.current;
    s.isHovering = false;
    s.targetScale = 1;
    s.targetTiltX = s.defaultTiltX;
    s.targetTiltY = s.defaultTiltY;
    if (s.isDragging) {
      s.isDragging = false;
      s.angularVel = s.dragAngularVel || 0.5;
    }
  };

  const clickStartRef = useRef({ time: 0, x: 0, y: 0 });

  const handleClickDown = (e: { clientX: number; clientY: number }) => {
    clickStartRef.current = { time: Date.now(), x: e.clientX, y: e.clientY };
  };

  const handleClickUp = (e: { clientX: number; clientY: number }) => {
    const dt = Date.now() - clickStartRef.current.time;
    const dx = e.clientX - clickStartRef.current.x;
    const dy = e.clientY - clickStartRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dt < 200 && dist < 5) {
      const s = state.current;
      s.angularVel += 8;
      const imgRect = imgRef.current?.getBoundingClientRect();
      if (imgRect) {
        spawnParticles(
          imgRect.left + imgRect.width / 2,
          imgRect.top + imgRect.height / 2,
          10,
          5
        );
      }
    }
  };

  const links = [
    { label: "linkedin", href: "https://www.linkedin.com/in/gsymmy/" },
    { label: "github", href: "https://github.com/gsymmy30" },
    { label: "twitter", href: "https://x.com/gsymmy" },
    { label: "email", href: "mailto:gsymmy@gmail.com" },
  ];

  const cornerPositions: Record<string, number>[] = [
    { top: 24, left: 24 },
    { top: 24, right: 24 },
    { bottom: 24, left: 24 },
    { bottom: 24, right: 24 },
  ];

  const spinArea = (
    <div
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        handleMouseDown({
          clientX: touch.clientX,
          clientY: touch.clientY,
          currentTarget: e.currentTarget,
        } as unknown as React.MouseEvent<HTMLDivElement>);
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        handleMouseMove({
          clientX: touch.clientX,
          clientY: touch.clientY,
          currentTarget: e.currentTarget,
        } as unknown as React.MouseEvent<HTMLDivElement>);
      }}
      onTouchEnd={(e) => {
        const touch = e.changedTouches[0];
        handleMouseUp({
          clientX: touch.clientX,
          clientY: touch.clientY,
        } as unknown as React.MouseEvent<HTMLDivElement>);
      }}
      style={{
        width: isMobile ? "100%" : "50%",
        minHeight: isMobile ? "50vh" : "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <img
        ref={imgRef}
        src="/gsymmy.png"
        alt="gsymmy"
        draggable={false}
        style={{
          maxWidth: isMobile ? "50%" : "60%",
          maxHeight: isMobile ? "40vh" : "60vh",
          objectFit: "contain",
          willChange: "transform",
          userSelect: "none",
        }}
      />
    </div>
  );

  const bio = (
    <div
      style={{
        width: isMobile ? "100%" : "50%",
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: isMobile ? "0 24px 40px" : "0 0 0 64px",
        boxSizing: "border-box",
        textAlign: "left",
      }}
    >
      <h1
        style={{
          fontSize: isMobile ? "1.8rem" : "2.5rem",
          fontWeight: 600,
          color: "#111",
          margin: "0 0 20px 0",
          letterSpacing: "-0.02em",
        }}
      >
        gursimran singh
      </h1>
      <img
        src="/headshot.png"
        alt="Gursimran Singh"
        style={{
          width: isMobile ? "140px" : "180px",
          height: isMobile ? "140px" : "180px",
          borderRadius: "0",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <p
        style={{
          fontSize: "1rem",
          fontWeight: 300,
          color: "#777",
          margin: "0 0 32px 0",
          letterSpacing: "0.05em",
        }}
      >
        san francisco, ca
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          color: "#555",
          fontSize: isMobile ? "0.85rem" : "0.9rem",
          fontWeight: 400,
          lineHeight: 1.7,
          maxWidth: isMobile ? "100%" : "420px",
          wordWrap: "break-word",
        }}
      >
        <p style={{ margin: 0 }}>
          i&apos;m a tpm at <img src="https://www.google.com/favicon.ico" alt="" style={{ width: "14px", height: "14px", verticalAlign: "middle", marginRight: "2px", display: "inline" }} /><img src="/deepmind-logo.ico" alt="" style={{ width: "14px", height: "14px", verticalAlign: "middle", marginRight: "2px", display: "inline" }} /><a href="https://deepmind.google/" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "3px" }}>google deepmind</a>, running operations and strategy for the <img src="https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg" alt="" style={{ width: "14px", height: "14px", verticalAlign: "middle", marginRight: "2px", display: "inline" }} />gemini ecosystem. before that i was a pm at <img src="https://www.microsoft.com/favicon.ico" alt="" style={{ width: "14px", height: "14px", verticalAlign: "middle", marginRight: "2px", display: "inline" }} />microsoft, working on <a href="https://azure.microsoft.com/en-us/products/monitor/" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "3px" }}>azure observability</a> and diagnostic tooling: the whole &ldquo;why did this break at 3am&rdquo; problem space.
        </p>
        <p style={{ margin: 0 }}>
          cs at <img src="/buzz.png" alt="" style={{ width: "14px", height: "14px", verticalAlign: "middle", marginRight: "2px", display: "inline" }} /><a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "3px" }}>georgia tech</a>, class of &apos;23. computer vision is where my brain goes when i get to pick. in college i built{" "}
          <a href="https://youtube.com/watch?v=0-CumFHE8eo" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "3px" }}>curbside</a>, a startup working on rider safety for electric scooters. none of it would have happened without my parents buying me a raspberry pi when i was 14. that thing genuinely changed what i thought i was allowed to build.
        </p>
        <p style={{ margin: 0 }}>
          outside work: i lift, i hike, i kayak when i get the chance. standup comedy and spy fiction on rotation when i&apos;m not doing any of that.
        </p>
        <p style={{ margin: 0 }}>
          some more fun links —{" "}
          <a href="https://nypost.com/2019/10/31/college-student-lands-fortune-500-gig-by-writing-hire-me-with-sticky-notes/" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "3px" }}>ny post</a>,{" "}
          <a href="https://yourstory.com/2017/06/gursimran-singh" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "3px" }}>yourstory</a>,{" "}
          <a href="https://youtu.be/2wObNkYiBfM?si=-Uza5-bbeiVAJWwq" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "3px" }}>youtube</a>
        </p>
      </div>
    </div>
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Corner links — desktop only */}
      {!isMobile &&
        links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "fixed",
              ...cornerPositions[i],
              color: "#555",
              fontSize: "0.85rem",
              fontWeight: 400,
              textDecoration: "none",
              letterSpacing: "0.05em",
              zIndex: 5,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#000")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#555")}
          >
            {link.label}
          </a>
        ))}

      <main
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "#ebeaea",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {spinArea}
        {bio}

        {/* Links row — mobile only */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              padding: "32px 0 48px",
              flexWrap: "wrap",
            }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#555",
                  fontSize: "0.85rem",
                  fontWeight: 400,
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
