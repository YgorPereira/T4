import React, { useState, useEffect, useCallback } from "react";
import styles from "./atualizacao.module.css";
import api from "../../../services/api";
import { Cliente } from "../../../models/types";

type Props = {
  cliente: Cliente;
  onSubmit: (clienteAtualizado: Cliente) => void;
  onCancelar?: () => void;
};

const AtualizarClienteForm: React.FC<Props> = ({ cliente, onSubmit, onCancelar }) => {
  const [nome, setNome] = useState("");
  const [sobreNome, setSobreNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rg, setRg] = useState("");
  const [genero, setGenero] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [informacoesAdicionais, setInformacoesAdicionais] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome || "");
      setSobreNome(cliente.sobreNome || "");
      setNomeSocial(cliente.nomeSocial || "");
      setCpf(cliente.cpf || "");
      setEmail(cliente.email || "");
      if (cliente.telefones && cliente.telefones.length > 0) {
        const t = cliente.telefones[0];
        setTelefone(`(${t.ddd}) ${t.numero}`);
      } else {
        setTelefone("");
      }
      setGenero(cliente.genero || "");
      setDataNascimento(cliente.data_nascimento || "");
      if (cliente.endereco) {
        setEstado(cliente.endereco.estado || "");
        setCidade(cliente.endereco.cidade || "");
        setBairro(cliente.endereco.bairro || "");
        setRua(cliente.endereco.rua || "");
        setNumero(cliente.endereco.numero || "");
        setCodigoPostal(cliente.endereco.codigoPostal || "");
        setInformacoesAdicionais(cliente.endereco.informacoesAdicionais || "");
      } else {
        setEstado("");
        setCidade("");
        setBairro("");
        setRua("");
        setNumero("");
        setCodigoPostal("");
        setInformacoesAdicionais("");
      }
    }
  }, [cliente]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setErro(null);

      const telefoneMatch = telefone.match(/\((\d{2})\)\s*(\d+)/);
      const telefones = telefoneMatch
        ? [{ ddd: telefoneMatch[1], numero: telefoneMatch[2] }]
        : [];

      const clienteAtualizado: Cliente = {
        ...cliente,
        nome,
        sobreNome,
        nomeSocial,
        cpf,
        email,
        telefones,
        genero,
        data_nascimento: dataNascimento,
        endereco: {
          estado,
          cidade,
          bairro,
          rua,
          numero,
          codigoPostal,
          informacoesAdicionais,
        },
      };

      try {
        const response = await api.put("/cliente/atualizar", clienteAtualizado);
        if (response.status === 200) {
          onSubmit(clienteAtualizado);
        } else {
          setErro(`Erro ao atualizar cliente: ${response.status}`);
        }
      } catch (error: any) {
        setErro(error.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    },
    [
      cliente,
      nome,
      sobreNome,
      nomeSocial,
      cpf,
      email,
      telefone,
      genero,
      dataNascimento,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      codigoPostal,
      informacoesAdicionais,
      onSubmit,
    ]
  );

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Atualizar Cliente</h2>

        {erro && <div style={{ color: "red", marginBottom: 10 }}>{erro}</div>}

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="cpf" className={styles.label}>
              CPF (não editável)
            </label>
            <input id="cpf" type="text" className={styles.input} value={cpf} disabled />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome" className={styles.label}>
              Nome
            </label>
            <input
              id="nome"
              type="text"
              className={styles.input}
              value={nome}
              onChange={e => setNome(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="sobreNome" className={styles.label}>
              Sobrenome
            </label>
            <input
              id="sobreNome"
              type="text"
              className={styles.input}
              value={sobreNome}
              onChange={e => setSobreNome(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="nomeSocial" className={styles.label}>
              Nome social
            </label>
            <input
              id="nomeSocial"
              type="text"
              className={styles.input}
              value={nomeSocial}
              onChange={e => setNomeSocial(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="telefone" className={styles.label}>
              Telefone
            </label>
            <input
              id="telefone"
              type="text"
              className={styles.input}
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
              placeholder="(DD) NÚMERO"
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="rg" className={styles.label}>
              RG
            </label>
            <input
              id="rg"
              type="text"
              className={styles.input}
              value={rg}
              onChange={e => setRg(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="genero" className={styles.label}>
              Gênero
            </label>
            <select
              id="genero"
              className={styles.input}
              value={genero}
              onChange={e => setGenero(e.target.value)}
              disabled={loading}
            >
              <option value="">Selecione</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
              <option value="nao_informar">Prefiro não informar</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="data_nascimento" className={styles.label}>
              Data de Nascimento
            </label>
            <input
              id="data_nascimento"
              type="date"
              className={styles.input}
              value={dataNascimento}
              onChange={e => setDataNascimento(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <h3 className={styles.title}>Endereço</h3>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="estado" className={styles.label}>
              Estado
            </label>
            <input
              id="estado"
              type="text"
              className={styles.input}
              value={estado}
              onChange={e => setEstado(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cidade" className={styles.label}>
              Cidade
            </label>
            <input
              id="cidade"
              type="text"
              className={styles.input}
              value={cidade}
              onChange={e => setCidade(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="bairro" className={styles.label}>
              Bairro
            </label>
            <input
              id="bairro"
              type="text"
              className={styles.input}
              value={bairro}
              onChange={e => setBairro(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="rua" className={styles.label}>
              Rua
            </label>
            <input
              id="rua"
              type="text"
              className={styles.input}
              value={rua}
              onChange={e => setRua(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="numero" className={styles.label}>
              Número
            </label>
            <input
              id="numero"
              type="text"
              className={styles.input}
              value={numero}
              onChange={e => setNumero(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="codigoPostal" className={styles.label}>
              Código Postal
            </label>
            <input
              id="codigoPostal"
              type="text"
              className={styles.input}
              value={codigoPostal}
              onChange={e => setCodigoPostal(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup} style={{ flex: 1 }}>
            <label htmlFor="informacoesAdicionais" className={styles.label}>
              Informações Adicionais
            </label>
            <textarea
              id="informacoesAdicionais"
              className={styles.input}
              value={informacoesAdicionais}
              onChange={e => setInformacoesAdicionais(e.target.value)}
              disabled={loading}
              rows={3}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Atualizando..." : "Atualizar"}
          </button>
          {onCancelar && (
            <button
              type="button"
              onClick={onCancelar}
              className={styles.cancelBtn}
              style={{ marginLeft: 8 }}
              disabled={loading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AtualizarClienteForm;
