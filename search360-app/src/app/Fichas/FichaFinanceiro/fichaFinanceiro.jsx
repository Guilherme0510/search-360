import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import './fichaFinanceiro.css';

function FichaFinanceiro() {
  const [formData, setFormData] = useState({
    encaminharClienteCobranca: false,
    naoEncaminharClienteCobranca: false,
    cobrador: '',
    dataEncaminhamento: '',
  });
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const { id } = useParams();
  const db = getFirestore();

  useEffect(() => {
    const fetchClienteData = async () => {
      try {
        const clienteDocRef = doc(db, 'clientes', id);
        const docSnapshot = await getDoc(clienteDocRef);
        if (docSnapshot.exists()) {
          setFormData(docSnapshot.data());
        } else {
          setMensagem('Cliente não encontrado');
        }
      } catch (error) {
        setMensagem('Erro ao obter dados do cliente');
        console.error('Erro ao obter dados do cliente:', error);
      }
    };
    fetchClienteData();
  }, [db, id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      const senhaDigitada = prompt("Digite sua senha:");
      if (senhaDigitada === '@') {
        await updateDoc(doc(db, 'clientes', id), formData);
        setSucesso(true);
      } else {
        setMensagem('Senha incorreta');
      }
    } catch (error) {
      setMensagem('Erro ao atualizar cliente');
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  if (sucesso) {
    return <Navigate to='/app/financeiromapsempresas' />;
  }

  return (
    <div>
      <div className="background9">
        <form className="box">
          <h1>Itens do Financeiro</h1>

          <div className="caixa-cobrador">
            <label>Nome do cobrador:</label>
            <select
              name="cobrador"
              className="custom-select d-block"
              value={formData.cobrador}
              onChange={handleInputChange}
              required
            >
              <option value="">Escolha</option>
              <option value="talita">talita</option>
              <option value="bruno">bruno</option>
              <option value="allan">allan</option>
              <option value="jhow">jhow</option>
              <option value="ana">ana</option>
              <option value="karol">karol</option>
              <option value="alef">alef</option>
              <option value="ana.caroline">Ana Caroline</option>
            </select>
          </div>

          <div className="col-md-12">
            <label htmlFor="dataEncaminhamento"><b>Data de Encaminhamento:</b></label>
            <input
              type="date"
              name="dataEncaminhamento"
              value={formData.dataEncaminhamento}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="divMkt">
            <h5>Encaminhar cliente para a cobrança?</h5>
          </div>
          <div className="encaminhar row">
            <div className="form-check mb-3">
              <input
                name="encaminharClienteCobranca"
                type="checkbox"
                className="form-check-input"
                checked={formData.encaminharClienteCobranca}
                onChange={handleInputChange}
              />
              <label className="form-check-label"><b>Sim</b></label>
            </div>

            <div className="form-check mb-3">
              <input
                name="naoEncaminharClienteCobranca"
                type="checkbox"
                className="form-check-input"
                checked={formData.naoEncaminharClienteCobranca}
                onChange={handleInputChange}
              />
              <label className="form-check-label"><b>Não</b></label>
            </div>
          </div>

          {mensagem && <div className="alert alert-danger mt-2">{mensagem}</div>}
        </form>
      </div>

      <div className="voltar row">
        <Link to="/app/financeiromapsempresas" className="btn btn-warning btn-acao">Voltar</Link>
        <button onClick={handleSave} className="btn btn-primary btn-acao">Salvar</button>
      </div>
    </div>
  );
}

export default FichaFinanceiro;
