import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const TechStack = () => {
  // The Integration & Backend Stack
  const techCategories = {
    orchestration: [
      {
        name: "Airflow",
        details: {
          title: "Airflow",
          desc: "For orchestration",
          url: "https://airflow.apache.org/",
        },
      },
      {
        name: "LangChain",
        details: {
          title: "LangChain",
          desc: "For complex decision trees",
          url: "https://www.langchain.com/",
        },
      },
    ],
    extraction: [
      {
        name: "OpenAI Vision",
        details: {
          title: "OpenAI Vision",
          desc: "For reading files",
          url: "https://platform.openai.com/",
        },
      },
      {
        name: "Azure Document Intelligence",
        details: {
          title: "Azure Document Intelligence",
          desc: "For reading files",
          url: "https://learn.microsoft.com/azure/ai-services/document-intelligence/",
        },
      },
    ],
    integration: [
      {
        name: "Python",
        details: {
          title: "Python",
          desc: "For custom API connectors",
          url: "https://www.python.org/",
        },
      },
      {
        name: "Node.js",
        details: {
          title: "Node.js",
          desc: "For custom API connectors",
          url: "https://nodejs.org/",
        },
      },
    ],
    database: [
      {
        name: "SQL",
        details: {
          title: "SQL",
          desc: "For storing structured output",
          url: "https://www.iso.org/standard/63555.html",
        },
      },
      {
        name: "Snowflake",
        details: {
          title: "Snowflake",
          desc: "For storing structured output",
          url: "https://www.snowflake.com/",
        },
      },
    ],
  };

  const [hovered, setHovered] = useState<{ cat: string; idx: number } | null>(
    null,
  );
  const [clicked, setClicked] = useState<{ cat: string; idx: number } | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleHoverEnter = (cat: string, idx: number) => {
    if (!isMobile) {
      setHovered({ cat, idx });
    }
  };

  const handleHoverLeave = () => {
    setHovered(null);
  };

  const handleClick = (cat: string, idx: number) => {
    if (isMobile) {
      setClicked(
        clicked && clicked.cat === cat && clicked.idx === idx
          ? null
          : { cat, idx }
      );
    }
  };

  return (
    <section id="tech-stack" className="py-6 xs:py-8 sm:py-10 px-3 xs:px-4 sm:px-6 md:py-12">
      <div className="container mx-auto">
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <h2
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 xs:mb-4"
            style={{ color: "#192841" }}
          >
            The Automation Stack
          </h2>
          <p className="text-sm xs:text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tools for orchestration, extraction, and execution.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="orchestration" className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full mb-8 xs:mb-10 sm:mb-12 gap-1 xs:gap-2 h-auto p-1 xs:p-1.5">
              <TabsTrigger value="orchestration" className="text-xs xs:text-sm py-2 xs:py-3">Orchestration</TabsTrigger>
              <TabsTrigger value="extraction" className="text-xs xs:text-sm py-2 xs:py-3">Extraction (IDP)</TabsTrigger>
              <TabsTrigger value="integration" className="text-xs xs:text-sm py-2 xs:py-3">Integration</TabsTrigger>
              <TabsTrigger value="database" className="text-xs xs:text-sm py-2 xs:py-3">Database</TabsTrigger>
            </TabsList>
            {Object.entries(techCategories).map(([key, technologies]) => (
              <TabsContent key={key} value={key} className="space-y-6 xs:space-y-8">
                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center p-2 sm:p-6 md:p-8">
                  {technologies.map((tech, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => handleHoverEnter(key, index)}
                      onMouseLeave={() => handleHoverLeave()}
                      onClick={() => handleClick(key, index)}
                      className="relative"
                    >
                      <Badge
                        variant="secondary"
                        className={`px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base bg-card/80 text-foreground border border-border/40 transition-all duration-300 opacity-100 cursor-pointer ${
                          isMobile
                            ? "hover:border-sky-400 hover:shadow-sky-blue"
                            : hovered && hovered.cat === key && hovered.idx === index
                              ? "scale-105 shadow-2xl z-30 border-sky-400"
                              : "hover:border-sky-400 hover:shadow-sky-blue"
                        }`}
                      >
                        {tech.name}
                      </Badge>
                      {/* Tooltip with pointer and richer content */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 mt-3 w-[90vw] xs:w-[280px] sm:w-[320px] max-w-xs bg-background border border-border rounded-xl shadow-2xl p-3 xs:p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground font-sans transition-all duration-300 z-40 pointer-events-none flex flex-col items-center gap-2 ${
                          isMobile
                            ? clicked && clicked.cat === key && clicked.idx === index
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-2"
                            : hovered && hovered.cat === key && hovered.idx === index
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-2"
                        }`}
                        style={{
                          boxShadow: "0 8px 32px 0 rgba(0, 80, 180, 0.10)",
                        }}
                      >
                        <div className="text-sm font-semibold text-primary text-center">
                          {tech.details.title}
                        </div>
                        <div className="text-xs text-muted-foreground text-center mb-2">
                          {tech.details.desc}
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 bg-background border-l border-t border-border rotate-45 z-10"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
