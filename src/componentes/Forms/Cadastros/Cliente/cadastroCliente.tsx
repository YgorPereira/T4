import React from "react";
import styles from "./cadastroCliente.module.css";

type Props = {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const CadastroClienteForm: React.FC<Props> = ({ onSubmit }) => {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h2 className={styles.title}>Cadastro de Cliente</h2>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="first_name" className={styles.label}>Nome</label>
                        <input id="first_name" type="text" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="social_name" className={styles.label}>Nome social</label>
                        <input id="social_name" type="text" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>E-mail</label>
                        <input id="email" type="email" className={styles.input} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cpf" className={styles.label}>CPF</label>
                        <input id="cpf" type="text" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="rg" className={styles.label}>RG</label>
                        <input id="rg" type="text" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="telefone" className={styles.label}>Telefone</label>
                        <input id="telefone" type="text" className={styles.input} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="genero" className={styles.label}>Gênero</label>
                        <select id="genero" className={styles.input}>
                            <option value="">Selecione</option>
                            <option value="feminino">Feminino</option>
                            <option value="masculino">Masculino</option>
                            <option value="outro">Outro</option>
                            <option value="nao_informar">Prefiro não informar</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="data_nascimento" className={styles.label}>Data de Nascimento</label>
                        <input id="data_nascimento" type="date" className={styles.input} />
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

export default CadastroClienteForm;