import {
  BrainCircuit,
  Atom,
  Braces,
  Gem,
  FlaskConical,
  Terminal,
} from "lucide";
import { Icon } from "./Icon";

type IconNode = [string, Record<string, string | number>][];

const CORE_TECHS = [
  {
    id: "ai-ml",
    icon: BrainCircuit as IconNode,
    category: "AI & Machine Learning",
    tagline: "Intelligent Solutions",
    accent: "border-t-magenta",
    iconColor: "text-magenta border-1",
    label: "text-magenta",
    spotlight: true,
    items: [
      "OpenAI GPT-4 & ChatGPT",
      "AWS Bedrock & Claude",
      "Google Gemini & Vertex AI",
      "Custom ML & RAG Systems",
    ],
  },
  {
    id: "react",
    icon: Atom as IconNode,
    category: "React Ecosystem",
    tagline: "Modern Frontend",
    accent: "border-t-indigo",
    iconColor: "text-indigo",
    label: "text-indigo",
    spotlight: false,
    items: [
      "React 18+",
      "Next.js",
      "React Native",
      "State Management & Optimization",
    ],
  },
  {
    id: "typescript",
    icon: Braces as IconNode,
    category: "TypeScript",
    tagline: "Type-Safe Development",
    accent: "border-t-violet",
    iconColor: "text-violet",
    label: "text-violet",
    spotlight: false,
    items: [
      "Strict Type Checking",
      "IDE Support & IntelliSense",
      "Refactoring & Maintenance Tools",
    ],
  },
  {
    id: "ruby",
    icon: Gem as IconNode,
    category: "Ruby on Rails",
    tagline: "Rapid Development",
    accent: "border-t-coral",
    iconColor: "text-coral",
    label: "text-coral",
    spotlight: false,
    items: [
      "Rapid Prototyping",
      "RESTful API Development",
      "ActiveRecord & Migrations",
      "Background Job Processing",
    ],
  },
  {
    id: "elixir",
    icon: FlaskConical as IconNode,
    category: "Elixir",
    tagline: "Fault-Tolerant Systems",
    accent: "border-t-orange",
    iconColor: "text-orange",
    label: "text-orange",
    spotlight: false,
    items: [
      "Phoenix Framework",
      "Real-time & LiveView",
      "Distributed Systems & Clustering",
    ],
  },
  {
    id: "python",
    icon: Terminal as IconNode,
    category: "Python",
    tagline: "Data Science & AI",
    accent: "border-t-indigo",
    iconColor: "text-indigo",
    label: "text-indigo",
    spotlight: false,
    items: [
      "TensorFlow & PyTorch",
      "Pandas & NumPy",
      "FastAPI & Django",
      "Automation & Scripting",
    ],
  },
];

export function TechStack() {
  return (
    <section className="relative py-24 bg-s1">
      {/* Ambient mesh */}
      <div
        aria-hidden
        className="absolute inset-0 bg-services-mesh pointer-events-none"
      />

      {/* Top gradient rule */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-horizon-gradient pointer-events-none"
      />

      <div className="relative mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="text-[12px] font-medium tracking-[0.10em] text-muted uppercase mb-3">
              Core technologies
            </p>
            <h2 className="text-display-xl font-bold tracking-display-xl leading-display-section text-ink">
              Built on the
              <br />
              right stack.
            </h2>
          </div>
          <span className="text-[13px] text-muted tracking-[-0.13px]">
            6 core platforms &middot; 3 discipline layers
          </span>
        </div>

        {/* Core Technology Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {CORE_TECHS.map(
            ({
              id,
              icon,
              category,
              tagline,
              accent,
              iconColor,
              label,
              spotlight,
              items,
            }) => (
              <div
                key={id}
                className={[
                  "rounded-[20px] border-t-2 p-7 flex flex-col gap-6 transition-all duration-200 hover:-translate-y-1",
                  spotlight
                    ? "bg-[linear-gradient(135deg,#1a0533_0%,#3b0764_40%,#6b21a8_100%)] hover:brightness-110"
                    : "bg-canvas hover:bg-ink/[0.04]",
                  accent,
                ].join(" ")}
              >
                {/* Icon + title block */}
                <div className="flex items-center gap-3">
                  <div className={`${iconColor} border w-fit p-4 rounded-full`}>
                    <Icon data={icon} size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.3px] text-ink leading-snug">
                      {category}
                    </h3>
                    <p
                      className={`text-[12px] font-medium tracking-[0.06em] uppercase mt-0.5 ${label}`}
                    >
                      {tagline}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-px ${spotlight ? "bg-white/[0.07]" : "bg-hairline-md"}`} />

                {/* Items */}
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className={`mt-[6px] w-1 h-1 rounded-full shrink-0 ${spotlight ? "bg-white/25" : "bg-muted/50"}`} />
                      <span className={`text-[14px] font-medium tracking-[-0.14px] leading-snug ${spotlight ? "text-white/60" : "text-muted"}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Bottom gradient rule */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px bg-horizon-gradient pointer-events-none"
      />
    </section>
  );
}
