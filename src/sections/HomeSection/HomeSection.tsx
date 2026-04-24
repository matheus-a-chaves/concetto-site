import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import heroImage from "../../assets/moveis/IMG_8029-negocio.jpg";

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "Ambientes", href: "#galeria-ambientes" },
  { label: "Cidades", href: "#cidades" },
  { label: "Processo", href: "#processo" },
  { label: "Feedback", href: "#feedback" },
  { label: "Contato", href: "#contato" },
];

function HomeSection() {
  const [activeSection, setActiveSection] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY;
      const viewportMiddle = scrollPosition + window.innerHeight / 2;
      const isNearPageBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 24;

      if (isNearPageBottom) {
        setActiveSection("#contato");
        return;
      }

      let currentSection = menuItems[0]?.href ?? "#home";

      menuItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (!(section instanceof HTMLElement)) return;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // A seção fica ativa quando o meio da viewport está dentro dela
        if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
          currentSection = item.href;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const section = document.querySelector(href);
    if (!(section instanceof HTMLElement)) return;

    event.preventDefault();

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const targetY = Math.max(
      0,
      sectionTop - (viewportHeight - sectionHeight) / 2,
    );

    window.history.replaceState(null, "", href);
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
    setActiveSection(href);
    setIsMobileMenuOpen(false); // Fecha o menu ao clicar em um item
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Previne scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <section className="hero" id="home">
      <img className="hero__bg-image" src={heroImage} alt="" />
      <div className="hero__overlay" aria-hidden="true" />

      <header className="topbar">
        <div className="brand">
          <img
            className="brand__logo"
            src={logo}
            alt="Concetto Móveis Planejados"
          />
          <p className="brand__subtitle">- MÓVEIS PLANEJADOS -</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="topbar__nav topbar__nav--desktop" aria-label="Menu principal">
          {menuItems.map((item) => (
            <a
              href={item.href}
              key={item.label}
              className={activeSection === item.href ? "is-active" : ""}
              onClick={(event) => handleMenuClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="topbar__menu-button"
          onClick={toggleMobileMenu}
          aria-label="Menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay & Navigation */}
        {isMobileMenuOpen && (
          <>
            <div
              className="topbar__overlay"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <nav className="topbar__nav--mobile" aria-label="Menu mobile">
              {menuItems.map((item) => (
                <a
                  href={item.href}
                  key={item.label}
                  className={activeSection === item.href ? "is-active" : ""}
                  onClick={(event) => handleMenuClick(event, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </>
        )}
      </header>

      <div className="hero__content">
        <div className="hero__text">
          <p className="eyebrow">Referência em móveis planejados</p>
          <h1>
            Transformamos sonhos em realidade através da marcenaria planejada.
          </h1>
          <p className="hero__description">
            Empresa referência em qualidade, exclusividade e sofisticação.
            Planejar sua casa ou ambiente de trabalho nunca foi tão fácil!.
          </p>

          <div className="hero__actions">
            <a className="button button--primary" href="#contato">
              Solicitar orçamento
            </a>
            <a className="button button--ghost" href="#galeria-ambientes">
              Ver projetos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
