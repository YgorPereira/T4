import React, { useState, useEffect, useRef } from "react";
import styles from "./cadastro.module.css";

const CadastroServicoForm: React.FC = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [valido, setValido] = useState(false);
  const precoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValido(nome.trim().length >= 2 && Number(preco) > 0);
  }, [nome, preco]);

  useEffect(() => {
    precoInputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Serviço cadastrado:\nNome: ${nome}\nPreço: R$${preco}`);
    setNome("");
    setPreco("");
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Cadastro de Serviço</h2>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome" className={styles.label}>
              Nome do Serviço
            </label>
            <input
              id="nome"
              type="text"
              className={styles.input}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="preco" className={styles.label}>
              Preço
            </label>
            <input
              id="preco"
              type="number"
              min="0.01"
              step="0.01"
              className={styles.input}
              value={preco}
              ref={precoInputRef}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={!valido}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroServicoForm;
