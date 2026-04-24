import { MapPin } from "lucide-react";

const cities = [
  "Registro",
  "Juquiá",
  "Cajati",
  "Jacupiranga",
  "Pariquera-Açu",
  "Iguape",
  "Miracatu",
  "Sete Barras",
  "Eldorado",
  "Ilha Comprida",
  "Cananéia",
  "Barra do Turvo",
  "Iporanga",
  "Pedro de Toledo",
  "Itariri",
];

const rows = [cities.slice(0, 5), cities.slice(5, 10), cities.slice(10)];

function CoverageSection() {
  return (
    <section className="coverage-v2" id="cidades">
      <div className="section__container">
        <div className="coverage-v2__header">
          <p className="coverage-v2__eyebrow">
            <span>•</span> ONDE ATUAMOS
          </p>
          <h2>Presente em todo o Vale do Ribeira</h2>
        </div>

        <div className="coverage-v2__container">
        <div className="coverage-v2__left">
          <p>
            Temos o prazer de atender clientes em todo o Vale do Ribeira. Nossos projetos de móveis
            planejados sob medida chegam às cidades de Registro, Juquiá, Cajati, Jacupiranga,
            Pariquera-Açu, Iguape, Miracatu, Sete Barras, Eldorado, Ilha Comprida, Cananéia, Barra
            do Turvo, Iporanga, Pedro de Toledo, Itariri e região, sempre com medição no local,
            projeto personalizado e instalação profissional.
          </p>
          <a className="coverage-v2__button" href="#contato">
            <MapPin size={16} /> Solicitar orçamento
          </a>
        </div>

        <div className="coverage-v2__right">
          {rows.map((row, index) => (
            <div
              key={index}
              className={`coverage-v2__marquee ${index % 2 === 1 ? "coverage-v2__marquee--reverse" : ""}`}
            >
              <div className="coverage-v2__track">
                {[...row, ...row].map((city, cityIndex) => (
                  <span className="coverage-v2__chip" key={`${index}-${city}-${cityIndex}`}>
                    <MapPin size={14} />
                    {city}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

export default CoverageSection;
