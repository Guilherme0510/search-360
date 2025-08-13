import React from "react";
import "./Contrato.css";

const CaixaAmarela = ({ text }) => {
  return (
    <div className="caixa-amarela mb-3">
      <h6 className="text-center mb-0 fw-semibold">{text}</h6>
      <i class="fa-solid fa-check text-success fs-2 icon-caixa"></i>
    </div>
  );
};

export default CaixaAmarela;
