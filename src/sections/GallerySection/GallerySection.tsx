import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Eye, ArrowRight } from "lucide-react";

type GalleryItem = {
  id: string;
  project: string;
  title: string;
  image: string;
};

type ProjectOption = {
  key: string;
  label: string;
  description: string;
};

// Importar todas as imagens dos projetos
const projectImages = import.meta.glob(
  "../../assets/projetos/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

// Processar imagens e agrupar por projeto
const galleryItems: GalleryItem[] = Object.entries(projectImages)
  .map(([path, image]) => {
    // Extrair nome do projeto da pasta
    const pathParts = path.split("/");
    const projectName = pathParts[pathParts.length - 2]; // Nome da pasta (projeto)
    const filename = pathParts[pathParts.length - 1]; // Nome do arquivo

    if (!projectName) return null;

    return {
      id: path,
      project: projectName,
      title: filename
        .replace(/\.(jpe?g|png)$/i, "")
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
      image,
    };
  })
  .filter((item): item is GalleryItem => item !== null);

// Mapeamento de imagem padrão para cada projeto (índice base 0)
const defaultImageIndex: Record<string, number> = {
  "Casa AC": 2, // Imagem 3 (índice 2)
  "Casa AE": 1, // Imagem 2 (índice 1)
  "Casa BD": 0, // Imagem 1 (índice 0)
  "Casa JG": 4, // Imagem 5 (índice 4)
  "Casa MC": 31, // Imagem 32 (índice 31)
  "Clinica PD": 10, // Imagem 11 (índice 10)
  "Distribuidora Eyros": 6, // Imagem 7 (índice 6)
  "Easy Soft": 0, // Imagem 1 (índice 0)
  "Escritório AC": 0, // Imagem 1 (índice 0)
  Prolab: 6, // Imagem 7 (índice 6)
  Remax: 2, // Imagem 3 (índice 2)
};

// Descrições personalizadas para cada projeto
const projectDescriptions: Record<string, string> = {
  "Casa AC":
    "Projeto residencial completo com cozinha planejada, dormitórios e áreas de convivência.",
  "Casa AE":
    "Ambientes integrados com móveis sob medida e design contemporâneo.",
  "Casa BD":
    "Projeto residencial com acabamentos premium e soluções inteligentes de armazenamento.",
  "Casa JG":
    "Residência com móveis planejados em todos os ambientes, priorizando funcionalidade e estilo.",
  "Casa MC":
    "Projeto completo de marcenaria residencial com detalhes exclusivos.",
  "Clinica PD":
    "Ambiente corporativo clínico com móveis planejados para recepção e consultórios.",
  "Distribuidora Eyros":
    "Espaço comercial com balcões, prateleiras e móveis corporativos sob medida.",
  "Easy Soft": "Projeto corporativo com móveis funcionais e design moderno.",
  "Escritório AC":
    "Home office planejado com móveis ergonômicos e otimização de espaço.",
  Prolab:
    "Recepção corporativa elegante com móveis planejados e acabamento sofisticado.",
  Remax:
    "Ambiente corporativo da Remax com móveis sob medida e identidade visual.",
};

// Criar lista de projetos únicos dinamicamente
const projectNames = Array.from(
  new Set(galleryItems.map((item) => item.project)),
).sort();

const projectOptions: ProjectOption[] = projectNames.map((name) => ({
  key: name,
  label: name,
  description:
    projectDescriptions[name] ||
    `Móveis planejados sob medida com qualidade e design exclusivo.`,
}));

function GallerySection() {
  const [selectedProject, setSelectedProject] = useState(
    projectOptions[0]?.key || "",
  );
  const [modalProject, setModalProject] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const galleryByProject = useMemo(
    () =>
      projectOptions.map((project) => {
        const items = galleryItems.filter(
          (item) => item.project === project.key,
        );
        return {
          ...project,
          items,
          thumbnail: items[0]?.image, // Primeira imagem como thumbnail
        };
      }),
    [],
  );

  const selectedGroup =
    galleryByProject.find((group) => group.key === selectedProject) ??
    galleryByProject[0];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (modalProject === null || modalIndex === null) return;
      const activeList =
        galleryByProject.find((group) => group.key === modalProject)?.items ??
        [];
      if (!activeList.length) return;
      if (event.key === "Escape") setModalIndex(null);
      if (event.key === "ArrowRight")
        setModalIndex((prev) => ((prev ?? 0) + 1) % activeList.length);
      if (event.key === "ArrowLeft")
        setModalIndex(
          (prev) => ((prev ?? 0) - 1 + activeList.length) % activeList.length,
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryByProject, modalProject, modalIndex]);

  useEffect(() => {
    if (modalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIndex]);

  const activeModalItems =
    galleryByProject.find((group) => group.key === modalProject)?.items ?? [];
  const activeItem = modalIndex !== null ? activeModalItems[modalIndex] : null;

  return (
    <>
      <section className="py-20 md:py-28 bg-white" id="galeria-ambientes">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14"
          >
            <span className="inline-block mb-3 text-[0.82rem] font-bold uppercase tracking-[0.22em] text-[#d08a42]">
              • PORTFÓLIO
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
              Galeria por Projeto
            </h2>
            <p className="text-muted-foreground max-w-lg text-base md:text-lg leading-relaxed">
              Explore nossos projetos completos e descubra como transformamos
              cada espaço.
            </p>
          </motion.div>

          {/* Project Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 md:gap-3 mb-10"
          >
            {projectOptions.map((project) => (
              <button
                key={project.key}
                onClick={() => setSelectedProject(project.key)}
                className={`
                  relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    selectedProject === project.key
                      ? "bg-[#d08a42] text-white shadow-md shadow-[#d08a42]/25"
                      : "bg-[#e8e5e0] text-[#222f3f] hover:bg-[#ddd8d0]"
                  }
                `}
              >
                {project.label}
              </button>
            ))}
          </motion.div>

          {/* Gallery Content: Image + Info Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedGroup.items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6 items-stretch">
                  {/* Main Image — takes 3/5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="md:col-span-3 relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/3]"
                    onClick={() => {
                      setModalProject(selectedGroup.key);
                      const defaultIndex =
                        defaultImageIndex[selectedGroup.key] ?? 0;
                      setModalIndex(defaultIndex);
                    }}
                  >
                    <img
                      src={
                        selectedGroup.items[
                          defaultImageIndex[selectedGroup.key] ?? 0
                        ]?.image || selectedGroup.items[0].image
                      }
                      alt={
                        selectedGroup.items[
                          defaultImageIndex[selectedGroup.key] ?? 0
                        ]?.title || selectedGroup.items[0].title
                      }
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gallery-overlay/0 group-hover:bg-gallery-overlay/20 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Eye className="w-6 h-6 text-foreground" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Info Panel — takes 2/5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="md:col-span-2 flex flex-col justify-between bg-secondary/50 rounded-xl p-6 md:p-8 border border-border"
                  >
                    <div>
                      <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 text-[#000]">
                        {selectedGroup.label}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                        Imagens do projeto {selectedGroup.label}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                        {selectedGroup.description}
                      </p>

                      {/* Stats */}
                      <div className="flex gap-8 mb-8">
                        <div>
                          <span className="block text-2xl font-semibold text-foreground">
                            {selectedGroup.items.length}
                          </span>
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">
                            {selectedGroup.items.length === 1
                              ? "Imagem"
                              : "Imagens"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setModalProject(selectedGroup.key);
                        const defaultIndex =
                          defaultImageIndex[selectedGroup.key] ?? 0;
                        setModalIndex(defaultIndex);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d08a42] text-white text-sm font-medium shadow-md shadow-[#d08a42]/25 hover:bg-[#bb7a39] hover:shadow-lg hover:shadow-[#d08a42]/30 transition-all duration-300 group self-start"
                    >
                      Ver todas as fotos
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                </div>
              ) : (
                <div className="text-center py-20 bg-secondary/40 rounded-xl border border-border">
                  <p className="text-muted-foreground">
                    Nenhuma foto disponível para este projeto.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setModalIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar */}
              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-sm text-primary-foreground/70 font-medium">
                  {selectedGroup.label}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-primary-foreground/60 tabular-nums">
                    {(modalIndex ?? 0) + 1} / {activeModalItems.length}
                  </span>
                  <button
                    onClick={() => setModalIndex(null)}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    aria-label="Fechar galeria"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Image with side arrows */}
              <div className="relative w-full flex items-center">
                <button
                  onClick={() =>
                    setModalIndex(
                      (prev) =>
                        ((prev ?? 0) - 1 + activeModalItems.length) %
                        activeModalItems.length,
                    )
                  }
                  className="absolute left-2 md:-left-14 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeItem.id}
                    src={activeItem.image}
                    alt={activeItem.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full max-h-[78vh] object-contain rounded-lg"
                  />
                </AnimatePresence>

                <button
                  onClick={() =>
                    setModalIndex(
                      (prev) => ((prev ?? 0) + 1) % activeModalItems.length,
                    )
                  }
                  className="absolute right-2 md:-right-14 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label="Próxima"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default GallerySection;
