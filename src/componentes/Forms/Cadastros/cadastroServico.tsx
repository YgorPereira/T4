import React from "react";
import styles from "./cadastro.module.css";

type Props = {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const CadastroServicoForm: React.FC<Props> = ({ onSubmit }) => {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h2 className={styles.title}>Cadastro de Serviço</h2>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nome" className={styles.label}>Nome do Serviço</label>
                        <input id="nome" type="text" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="preco" className={styles.label}>Preço</label>
                        <input id="preco" type="number" step="0.01" min="0" className={styles.input} />
                    </div>
                </div>
                <div className={styles.actions}>
                    <button type="submit" className={styles.submitBtn}>
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CadastroServicoForm;