import React from "react";
import styles from "./atualizacao.module.css";

type Props = {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const AtualizarProdutoForm: React.FC<Props> = ({ onSubmit }) => {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h2 className={styles.title}>Atualizar Produto</h2>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nomeProduto" className={styles.label}>Nome do Produto (para localizar)</label>
                        <input id="nomeProduto" type="text" className={styles.input} placeholder="Digite o nome do produto" />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="novoNome" className={styles.label}>Novo Nome</label>
                        <input id="novoNome" type="text" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="preco" className={styles.label}>Novo Preço</label>
                        <input id="preco" type="number" step="0.01" min="0" className={styles.input} />
                    </div>
                </div>
                <div className={styles.actions}>
                    <button type="submit" className={styles.submitBtn}>
                        Atualizar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AtualizarProdutoForm;