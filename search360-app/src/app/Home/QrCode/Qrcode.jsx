import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import QRCode from "qrcode.react";
import { db } from "../../Acesso/Config/firebase";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import qrCode from "./qrcodee.png";
import "./Qrcode.css"; // Arquivo de estilos

const QrcodePage = () => {
  const { id } = useParams();
  const [linkPagina, setLinkPagina] = useState("");

  useEffect(() => {
    const fetchLink = async () => {
      const docRef = doc(db, "clientes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLinkPagina(docSnap.data().linkPagina);
      }
    };

    fetchLink();
  }, [id]);

  const downloadPDF = () => {
    const element = document.getElementById("qr-content");

    if (!element) return;

    html2canvas(element, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save("QRCode.pdf");
    });
  };

  return (
    <div className="qr-container">
      <div id="qr-content">
        <div className="qr-code">
          {linkPagina ? (
            <QRCode value={linkPagina} size={270} />
          ) : (
            <p>Carregando QR Code...</p>
          )}
        </div>
        <img src={qrCode} alt="Imagem ilustrativa" className="img-qrcode" />
      </div>
      <button onClick={downloadPDF} className="download-btn">
        Baixar PDF
      </button>
    </div>
  );
};

export default QrcodePage;
