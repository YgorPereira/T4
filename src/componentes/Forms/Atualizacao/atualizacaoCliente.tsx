import React from "react";
import styles from "./atualizacao.module.css";

type Props = {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const AtualizarClienteForm: React.FC<Props> = ({ onSubmit }) => {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h2 className={styles.title}>Atualizar Cliente</h2>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cpf" className={styles.label}>CPF (para localizar)</label>
                        <input id="cpf" type="text" className={styles.input} placeholder="Digite o CPF" />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nome" className={styles.label}>Nome</label>
                        <input id="nome" type="text" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nomeSocial" className={styles.label}>Nome social</label>
                        <input id="nomeSocial" type="text" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>E-mail</label>
                        <input id="email" type="email" className={styles.input} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="telefone" className={styles.label}>Telefone</label>
                        <input id="telefone" type="text" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="rg" className={styles.label}>RG</label>
                        <input id="rg" type="text" className={styles.input} />
                    </div>
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
                </div>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="data_nascimento" className={styles.label}>Data de Nascimento</label>
                        <input id="data_nascimento" type="date" className={styles.input} />
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

export default AtualizarClienteForm;