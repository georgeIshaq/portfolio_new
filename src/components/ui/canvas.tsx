import { useEffect, useRef } from "react";

interface CanvasEffectProps {
  heroSectionId: string;
}

const CanvasEffect = ({ heroSectionId }: CanvasEffectProps) => {
  // Use a ref for the canvas instead of state
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // --- Begin original renderCanvas logic ---
    function n(this: any, e: any) {
      this.init(e || {});
    }
    n.prototype = {
      init: function (this: any, e: any) {
        this.phase = e.phase || 0;
        this.offset = e.offset || 0;
        this.frequency = e.frequency || 0.001;
        this.amplitude = e.amplitude || 1;
      },
      update: function (this: any) {
        this.phase += this.frequency;
        return this.offset + Math.sin(this.phase) * this.amplitude;
      },
      value: function (this: any) {
        return this.offset + Math.sin(this.phase) * this.amplitude;
      },
    };
    function Node(this: any) {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
    }
    function Line(this: any, e: any) {
      this.init(e || {});
    }
    let ctx: any, f: any, pos: { x?: number; y?: number } = {}, lines: any[] = [], animationId: number;
    
    // Last known mouse position in viewport coordinates (not scroll-dependent)
    let lastClientX = 0;
    let lastClientY = 0;
    
    const E = {
      debug: true,
      friction: 0.5,
      trails: 80,
      size: 50,
      dampening: 0.025,
      tension: 0.99,
    };
    Line.prototype = {
      init: function (this: any, e: any) {
        this.spring = e.spring + 0.1 * Math.random() - 0.05;
        this.friction = E.friction + 0.01 * Math.random() - 0.005;
        this.nodes = [];
        for (let n = 0; n < E.size; n++) {
          let t = new (Node as any)();
          t.x = pos.x || 0;
          t.y = pos.y || 0;
          this.nodes.push(t);
        }
      },
      update: function (this: any) {
        let e = this.spring,
          t = this.nodes[0];
        t.vx += ((pos.x || 0) - t.x) * e;
        t.vy += ((pos.y || 0) - t.y) * e;
        for (let i = 0, a = this.nodes.length; i < a; i++) {
          t = this.nodes[i];
          if (i > 0) {
            let n = this.nodes[i - 1];
            t.vx += (n.x - t.x) * e;
            t.vy += (n.y - t.y) * e;
            t.vx += n.vx * E.dampening;
            t.vy += n.vy * E.dampening;
          }
          t.vx *= this.friction;
          t.vy *= this.friction;
          t.x += t.vx;
          t.y += t.vy;
          e *= E.tension;
        }
      },
      draw: function (this: any) {
        let n = this.nodes[0].x,
          i = this.nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(n, i);
        for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
          let e = this.nodes[a];
          let t = this.nodes[a + 1];
          n = 0.5 * (e.x + t.x);
          i = 0.5 * (e.y + t.y);
          ctx.quadraticCurveTo(e.x, e.y, n, i);
        }
        let e = this.nodes[this.nodes.length - 2];
        let t = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
        ctx.stroke();
        ctx.closePath();
      },
    };

    // Function to reset all line positions and prevent streaks
    function resetLines() {
      lines = [];
      for (let e = 0; e < E.trails; e++) {
        lines.push(new (Line as any)({ spring: 0.45 + (e / E.trails) * 0.025 }));
      }
    }

    // Update mouse position and directly manage canvas visibility
    function updateMousePosition(e: MouseEvent | TouchEvent) {
      if ('touches' in e) {
        // Touch event
        if (e.touches.length > 0) {
          lastClientX = e.touches[0].clientX;
          lastClientY = e.touches[0].clientY;
          
          // Set the position directly - no scroll offset needed
          pos.x = lastClientX;
          pos.y = lastClientY;
        }
      } else {
        // Mouse event
        lastClientX = e.clientX;
        lastClientY = e.clientY;
        
        // Set the position directly - no scroll offset needed
        pos.x = lastClientX;
        pos.y = lastClientY;
      }

      // Check visibility after updating mouse position
      checkHeroVisibility();
    }

    // Track if we're currently inside the hero section
    let isCurrentlyInHero = false;

    // Check if cursor is within hero section boundaries
    function checkHeroVisibility() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Get hero section element
      const heroSection = document.getElementById(heroSectionId);
      if (!heroSection) return;
      
      // Get element boundaries
      const rect = heroSection.getBoundingClientRect();
      
      // Check if any part of the hero is visible in the viewport
      const isVisible = 
        rect.top < window.innerHeight && 
        rect.bottom > 0;
      
      // Check if mouse is in the visible portion of the hero section
      const isMouseInHero = 
        lastClientX >= rect.left && 
        lastClientX <= rect.right && 
        lastClientY >= Math.max(0, rect.top) && 
        lastClientY <= Math.min(window.innerHeight, rect.bottom);
      
      // Directly manage canvas visibility
      if (isVisible && isMouseInHero) {
        // Track if we're entering the hero section for the first time
        const isEnteringHero = !isCurrentlyInHero;
        isCurrentlyInHero = true;

        // Make sure the canvas is visible and rendering
        canvas.style.display = 'block';
        
        // Only reset lines if we're re-entering the hero section
        if (isEnteringHero) {
          resetLines();
        }
        
        if (!ctx.running) {
          ctx.running = true;
          render();
        }
      } else {
        // We're no longer in the hero section
        isCurrentlyInHero = false;
        
        // Hide the canvas
        canvas.style.display = 'none';
      }
    }

    // Force activate the canvas effect
    function forceActivate() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Ensure canvas is visible
      canvas.style.display = 'block';
      
      // Only reset lines if we're re-entering the hero
      if (!isCurrentlyInHero) {
        resetLines();
      }
      
      isCurrentlyInHero = true;
      
      // Restart rendering if needed
      if (ctx && !ctx.running) {
        ctx.running = true;
        render();
      }
      
      // Force a new check
      checkHeroVisibility();
    }

    // Handler for mouse entering the hero section
    function onHeroMouseEnter(e: MouseEvent) {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      pos.x = lastClientX;
      pos.y = lastClientY;
      
      // Only reset lines if we're re-entering the hero section
      if (!isCurrentlyInHero) {
        resetLines();
      }
      
      isCurrentlyInHero = true;
      
      // Force activate the canvas
      forceActivate();
    }

    // On scroll, immediately update the position and check visibility
    function handleScroll() {
      // Check if we should show/hide the canvas based on current scroll position
      checkHeroVisibility();
    }

    function render() {
      if (!ctx || !ctx.running) return;
      
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `hsla(${Math.round(f.update())},100%,50%,0.025)`;
      ctx.lineWidth = 10;
      for (let t = 0; t < E.trails; t++) {
        lines[t].update();
        lines[t].draw();
      }
      ctx.frame++;
      animationId = window.requestAnimationFrame(render);
    }
    
    function resizeCanvas() {
      if (!ctx) return;
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      
      // Also check visibility when resizing
      checkHeroVisibility();
    }
    
    function onMousemove(e: MouseEvent | TouchEvent) {
      document.removeEventListener("mousemove", onMousemove as any);
      document.removeEventListener("touchstart", onMousemove as any);
      
      // Set up event listeners with our new position tracking
      document.addEventListener("mousemove", updateMousePosition, { passive: true });
      document.addEventListener("touchmove", updateMousePosition, { passive: true });
      document.addEventListener("touchstart", updateMousePosition, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      
      // Initialize with the current event
      updateMousePosition(e);
      resetLines();
      render();
    }

    // Set up hero section event listeners
    function setupHeroEvents() {
      const heroSection = document.getElementById(heroSectionId);
      if (heroSection) {
        // Use capture phase to ensure events are captured
        heroSection.addEventListener('mouseover', onHeroMouseEnter, true);
        heroSection.addEventListener('mouseenter', onHeroMouseEnter, true);
        
        // Add click handler for testing
        heroSection.addEventListener('click', forceActivate, true);
      }
    }
    
    // Initialize canvas and start rendering
    function initCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.running = true;
      ctx.frame = 1;
      f = new (n as any)({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
      });
      
      document.addEventListener("mousemove", onMousemove as any);
      document.addEventListener("touchstart", onMousemove as any);
      document.body.addEventListener("orientationchange", resizeCanvas);
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("focus", forceActivate);
      
      // Setup hero section events
      setupHeroEvents();
      
      // Initial setup
      resizeCanvas();
      checkHeroVisibility();
      
      // Setup a periodic check
      const checkInterval = setInterval(checkHeroVisibility, 1000);
      
      return checkInterval;
    }
    
    // Start everything once component is mounted
    const checkInterval = initCanvas();
    
    // Cleanup function
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      document.removeEventListener("mousemove", onMousemove as any);
      document.removeEventListener("touchstart", onMousemove as any);
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("touchmove", updateMousePosition);
      document.removeEventListener("touchstart", updateMousePosition);
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("orientationchange", resizeCanvas);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("focus", forceActivate);
      
      // Clean up hero-specific handlers
      const heroSection = document.getElementById(heroSectionId);
      if (heroSection) {
        heroSection.removeEventListener('mouseover', onHeroMouseEnter, true);
        heroSection.removeEventListener('mouseenter', onHeroMouseEnter, true);
        heroSection.removeEventListener('click', forceActivate, true);
      }
      
      if (ctx) {
        ctx.running = false;
      }
    };
    // --- End original renderCanvas logic ---
  }, [heroSectionId]);
  
  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default CanvasEffect;

