document.addEventListener("DOMContentLoaded", () => {
  const navBtns = document.querySelectorAll(".nav-btn");
  const panels = document.querySelectorAll(".panels-container .glass-panel");
  const sidebar = document.querySelector(".sidebar");
  const costCardContainer = document.querySelector(".cost-card-container");
  const costCard = document.querySelector(".cost-card");

  let activePanelIndex = 0;
  let autoPlayTimeline;

  // Initialize initial states
  gsap.set(panels, { opacity: 0, y: 20, scale: 0.95 });
  gsap.set(costCard, { opacity: 0, y: 40 });
  gsap.set([".val-sub", ".val-own"], { opacity: 0, y: 10 });

  function showPanel(index) {
    if (index === activePanelIndex && panels[activePanelIndex].classList.contains("active")) return;

    const outgoing = panels[activePanelIndex];
    const incoming = panels[index];

    navBtns.forEach((btn) => btn.classList.remove("active"));
    navBtns[index].classList.add("active");

    // Animate out current
    if (outgoing && outgoing.classList.contains("active")) {
      gsap.to(outgoing, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => outgoing.classList.remove("active"),
      });
    }

    // Animate in new
    incoming.classList.add("active");
    gsap.fromTo(
      incoming,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.2)", delay: 0.2 }
    );

    activePanelIndex = index;
  }

  function startDemo() {
    // Show first panel
    panels[0].classList.add("active");
    gsap.to(panels[0], { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.2)" });

    // Create a timeline for the automated sequence
    autoPlayTimeline = gsap.timeline({
      onComplete: showCostComparison,
    });

    // Sequence: Wait, then switch to Panel 2
    autoPlayTimeline.delayedCall(2.5, () => showPanel(1));

    // Wait, then switch to Panel 3
    autoPlayTimeline.delayedCall(5.0, () => showPanel(2));

    // Pad the end of the timeline before firing the onComplete (Cost Comparison)
    autoPlayTimeline.to({}, { duration: 2.5 });
  }

  function showCostComparison() {
    const tl = gsap.timeline();

    // Hide sidebar and current panel
    tl.to([sidebar, panels[activePanelIndex]], {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0.1,
    });

    // Show Cost Comparison Card
    tl.to(costCard, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.2)",
    });

    // Animate Chart Bars (Baseline y=170)
    // Sub Bar: height 0 -> 140, y 170 -> 30
    tl.to(
      ".bar-sub",
      {
        attr: { height: 140, y: 30 },
        duration: 1.5,
        ease: "power3.out",
      },
      "-=0.2"
    );

    // Show Subscription Value
    tl.to(
      ".val-sub",
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      },
      "-=0.5"
    );

    // Own Bar: height 0 -> 80, y 170 -> 90
    tl.to(
      ".bar-own",
      {
        attr: { height: 80, y: 90 },
        duration: 1.5,
        ease: "power3.out",
      },
      "-=1.2"
    );

    // Show Own Value
    tl.to(
      ".val-own",
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      },
      "-=0.5"
    );
  }

  // Handle manual navigation clicks
  navBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // If user interacts, kill the automatic timeline
      if (autoPlayTimeline) {
        autoPlayTimeline.kill();
      }
      showPanel(index);
      
      // Optionally trigger cost comparison early after a delay
      // or add a button to manually trigger it.
    });
  });

  // Start the automated demo sequence after a short initial delay
  gsap.delayedCall(0.5, startDemo);
});
