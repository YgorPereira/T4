import React, { useState, useEffect, useCallback } from "react";
import styles from "./atualizacao.module.css";

type Produto = {
    id: number;
    nome: string;
    preco: number;
};

type Props = {
    produto: Produto;
    onSubmit: (produtoAtualizado: Produto) => void;
    onCancelar?: () => void;
};

const AtualizarProdutoForm: React.FC<Props> = ({ produto, onSubmit, onCancelar }) => {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState<number | "">("");

    useEffect(() => {
        if (produto) {
            setNome(produto.nome);
            setPreco(produto.preco);
        }
    }, [produto]);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (nome.trim() === "" || preco === "" || preco < 0) {
                alert("Preencha corretamente os campos.");
                return;
            }
            onSubmit({ ...produto, nome, preco: Number(preco) });
        },
        [produto, nome, preco, onSubmit]
    );

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Atualizar Produto</h2>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nomeProduto" className={styles.label}>
                            Nome do Produto (não editável)
                        </label>
                        <input id="nomeProduto" type="text" className={styles.input} value={produto.nome} disabled />
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

export default AtualizarProdutoForm;
