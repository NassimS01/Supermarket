import { useState } from "react";
import { AsideNews } from "./NewsletterStyles";
import { Container } from "../ExtraInfo/ExtraInfoStyles";

const Newsletter = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos a enviar", formData);
  };

  return (
      <AsideNews>
        <h2>Obtenga descuentos especiales</h2>
        <p className="text">
          Agregue su email para recibir novedades y cupones de descuento.
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.name}
            onChange={handleChange}
            placeholder="Introduzca su email"
          />
          <button type="submit" value="Suscribirse">
            Suscribirse
          </button>
        </form>
      </AsideNews>
  );
};

export default Newsletter;
