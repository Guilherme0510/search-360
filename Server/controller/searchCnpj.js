import axios from "axios";

export const SearchCnpj = async (req, res) => {
  const { cnpj } = req.query; // Usando req.query para capturar o cnpj da URL

  if (!cnpj) {
    return res.status(400).json({ message: "O valor do CNPJ é obrigatório" });
  }

  try {
    const response = await axios.get(
      `https://api.casadosdados.com.br/v4/cnpj/${cnpj}`,
      {
        headers: {
          "api-key": process.env.API_TOKEN_CASAS_DOS_DADOS,
        },
      }
    );

    const data = response.data;

    const filteredData = {
      quadro_societario: data.quadro_societario.map((socio) => ({
        nome: socio.nome,
      })),
      razao_social: data.razao_social,
      nome_fantasia: data.nome_fantasia,
      cnpj: data.cnpj,
      endereco: {
        logradouro: data.endereco.logradouro,
        bairro: data.endereco.bairro,
        cidade: data.endereco.municipio,
        estado: data.endereco.uf,
        cep: data.endereco.cep,
      },
      atividade_principal: data.atividade_principal.descricao,
      contato: {
        telefone: data.contato_telefonico?.[0]?.completo || "Não informado",
        email: data.contato_email?.[0]?.email || "Não informado",
      },
    };

    return res.status(200).json(filteredData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
