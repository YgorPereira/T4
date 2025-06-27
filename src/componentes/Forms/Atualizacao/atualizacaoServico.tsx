import React from "react";
import styles from "./atualizacao.module.css";

type Props = {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const AtualizarServicoForm: React.FC<Props> = ({ onSubmit }) => {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h2 className={styles.title}>Atualizar Serviço</h2>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nomeServico" className={styles.label}>Nome do Serviço (para localizar)</label>
                        <input id="nomeServico" type="text" className={styles.input} placeholder="Digite o nome do serviço" />
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

export default AtualizarServicoForm;