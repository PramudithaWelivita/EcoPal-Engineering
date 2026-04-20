const fs = require('fs');

const path = 'd:\\Webhost\\EcoPal Engineering\\src\\components\\LandingPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Locate the markers
const sec1StartMarker = "{/* ══════════════════════════════════════════\n          SECTION 1 — HERO (SPLIT LAYOUT)";
const sec2StartMarker = "{/* ══════════════════════════════════════════\n          SECTION 2 — INTRODUCING BIOGAS";
const brandingMarker = "{/* ── Corner branding ── */";

const p1 = content.indexOf(sec1StartMarker);
const p2 = content.indexOf(sec2StartMarker);
const p3 = content.indexOf(brandingMarker);

if (p1 === -1 || p2 === -1 || p3 === -1) {
    console.log("Could not find markers!");
    process.exit(1);
}

// Ensure proper slicing boundaries
let preSection = content.slice(0, p1);
let section1 = content.slice(p1, p2);
let section2 = content.slice(p2, p3);
let postSection = content.slice(p3);

// 2. We need to swap them. However, they have classes and scroll cues.
// In Section 1 (Smart Cities), we need to change it from 'min-h-screen' to 'py-20', and remove the scroll cue.
// In Section 2 (BioGas), we need to change 'py-20' to 'min-h-screen', and ADD a scroll cue.

// A. Clean up Section 1 (Smart Cities)
section1 = section1.replace('className="relative min-h-screen flex items-center"', 'className="relative py-20"');
section1 = section1.replace('div className="max-w-7xl mx-auto px-6 lg:px-16 w-full py-28 lg:py-0"', 'div className="max-w-7xl mx-auto px-6 lg:px-16"');

// Remove the section 1 scroll cue
const scrollCueRegex = /\{\/\* scroll cue \*\/\}[\s\S]*?<\/motion\.div>/;
section1 = section1.replace(scrollCueRegex, '');


// B. Clean up Section 2 (BioGas)
section2 = section2.replace('className="relative py-20"', 'className="relative min-h-screen flex items-center"');
// We need to inject the Scroll cue right before the </section> of Section 2
const scrollCueString = `
        {/* scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
          style={{ zIndex: 20 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => containerRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-white/70 text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/70" />
        </motion.div>
`;
section2 = section2.replace('</section>', scrollCueString + '      </section>\n\n      ');

// C. Re-stitch the file in swapped order
const newContent = preSection + section2 + section1 + postSection;

fs.writeFileSync(path, newContent, 'utf8');
console.log("Successfully swapped sections and updated styling/cues!");
