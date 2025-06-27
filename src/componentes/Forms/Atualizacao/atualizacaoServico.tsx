import React, { useState, useEffect, useCallback } from "react";
import styles from "./atualizacao.module.css";

type Servico = {
    id: number;
    nome: string;
    preco: number;
};

type Props = {
    servico: Servico;
    onSubmit: (servicoAtualizado: Servico) => void;
    onCancelar?: () => void;
};

const AtualizarServicoForm: React.FC<Props> = ({ servico, onSubmit, onCancelar }) => {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState<number | "">("");

    useEffect(() => {
        if (servico) {
            setNome(servico.nome);
            setPreco(servico.preco);
        }
    }, [servico]);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (nome.trim() === "" || preco === "" || preco < 0) {
                alert("Preencha corretamente os campos.");
                return;
            }
            onSubmit({ ...servico, nome, preco: Number(preco) });
        },
        [servico, nome, preco, onSubmit]
    );

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Atualizar Serviço</h2>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nomeServico" className={styles.label}>
                            Nome do Serviço (não editável)
                        </label>
                        <input id="nomeServico" type="text" className={styles.input} value={servico.nome} disabled />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="novoNome" className={styles.label}>
                            Novo Nome
                        </label>
                        <input id="novoNome" type="text" className={styles.input} value={nome} onChange={e => setNome(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="preco" className={styles.label}>
                            Novo Preço
                        </label>
                        <input
                            id="preco"
                            type="number"
                            step="0.01"
                            min="0"
                            className={styles.input}
                            value={preco}
                            onChange={e => setPreco(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className={styles.actions}>
                    <button type="submit" className={styles.submitBtn}>
                        Atualizar
                    </button>
                    {onCancelar && (
                        <button type="button" onClick={onCancelar} className={styles.cancelBtn} style={{ marginLeft: 8 }}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AtualizarServicoForm;
