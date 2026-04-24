import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import step01 from "../../assets/process/step-01.jpg";
import step02 from "../../assets/process/step-02.jpg";
import step03 from "../../assets/process/step-03.jpg";
import step04 from "../../assets/process/step-04.jpg";
import step05 from "../../assets/process/step-05.jpg";

const stepImages = [step01, step02, step03, step04, step05];

const steps = [
  {
    number: "01",
    title: "Primeiro contato",
    description:
      "Tudo começa com uma conversa para entender suas necessidades, estilo de vida e expectativas. Ouvimos cada detalhe para criar um projeto que reflita a sua personalidade.",
  },
  {
    number: "02",
    title: "Projeto e planejamento",
    description:
      "Nossa equipe elabora o projeto com medidas precisas, escolha de materiais e acabamentos. Você acompanha cada etapa e aprova antes da fabricação.",
  },
  {
    number: "03",
    title: "Fabricação",
    description:
      "Com o projeto aprovado, iniciamos a fabricação utilizando materiais de alta qualidade e tecnologia de ponta, garantindo durabilidade e acabamento impecável.",
  },
  {
    number: "04",
    title: "Entrega e montagem",
    description:
      "Com a fabricação concluída, agendamos a entrega e a montagem dos móveis no local. Essa etapa é executada com cuidado, organização e acompanhamento técnico.",
  },
  {
    number: "05",
    title: "Pós-venda",
    description:
      "Nosso compromisso não termina na entrega. Oferecemos suporte e assistência para garantir sua total satisfação com os móveis planejados.",
  },
];

function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-white" id="processo">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <span className="inline-block mb-3 text-[0.82rem] font-bold uppercase tracking-[0.22em] text-[#d08a42]">
            • COMO FUNCIONA
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
            Como funciona nosso processo
          </h2>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#f6f4f0] rounded-xl border border-[#e6e1d8] p-6 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 items-stretch min-h-[380px]">
            {/* Left: Text */}
            <div className="flex flex-col justify-start pt-2 pr-0 md:pr-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-md"
                >
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#8a8f96] mb-3 block">
                    Step {steps[activeStep].number}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-5 leading-tight">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-[#6f7680] text-sm md:text-[1.01rem] leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center: Timeline */}
            <div className="hidden md:flex flex-col items-center py-2 px-6">
              <div className="relative flex flex-col items-center gap-0 h-full">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className="flex flex-col items-center flex-1"
                  >
                    <button
                      onClick={() => setActiveStep(index)}
                      className={`
                        relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                        transition-all duration-300 shrink-0
                        ${
                          index === activeStep
                            ? "bg-[#d08a42] text-white shadow-md shadow-[#d08a42]/30 scale-110"
                            : index < activeStep
                              ? "bg-[#f2e2cd] text-[#d08a42] border-2 border-[#e8c79d]"
                              : "bg-[#f0f0f0] text-[#7b848f]"
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 min-h-[16px] transition-colors duration-300 ${
                          index < activeStep ? "bg-[#dfb178]" : "bg-[#e2e2e2]"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile step indicators */}
            <div className="flex md:hidden gap-2 justify-center">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                    ${
                      index === activeStep
                        ? "bg-[#d08a42] text-white shadow-md shadow-[#d08a42]/30"
                        : "bg-[#f0f0f0] text-[#7b848f]"
                    }
                  `}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Right: Image */}
            <div className="flex flex-col justify-between pl-0 md:pl-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="w-full aspect-[4/3] rounded-lg overflow-hidden"
                >
                  <img
                    src={stepImages[activeStep]}
                    alt={steps[activeStep].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() =>
                    setActiveStep((prev) => (prev + 1) % steps.length)
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4b443d] text-white text-sm font-medium shadow-md hover:bg-[#3f3933] hover:shadow-lg transition-all duration-300 group"
                >
                  {activeStep < steps.length - 1
                    ? "Próxima etapa"
                    : "Voltar ao início"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessSection;
