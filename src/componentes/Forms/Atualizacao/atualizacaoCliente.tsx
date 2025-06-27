import React, { useState, useEffect, useCallback } from "react";
import styles from "./atualizacao.module.css";

type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: string;
    email?: string;
    telefone?: string;
    rg?: string;
    genero?: string;
    data_nascimento?: string;
};

type Props = {
    cliente: Cliente;
    onSubmit: (clienteAtualizado: Cliente) => void;
    onCancelar?: () => void;
};

const AtualizarClienteForm: React.FC<Props> = ({ cliente, onSubmit, onCancelar }) => {
    // Hooks para cada campo
    const [nome, setNome] = useState("");
    const [nomeSocial, setNomeSocial] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [rg, setRg] = useState("");
    const [genero, setGenero] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    // useEffect para popular os campos quando o cliente mudar
    useEffect(() => {
        if (cliente) {
            setNome(cliente.nome || "");
            setNomeSocial(cliente.nomeSocial || "");
            setCpf(cliente.cpf || "");
            setEmail(cliente.email || "");
            setTelefone(cliente.telefone || "");
            setRg(cliente.rg || "");
            setGenero(cliente.genero || "");
            setDataNascimento(cliente.data_nascimento || "");
        }
    }, [cliente]);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const clienteAtualizado: Cliente = {
                ...cliente,
                nome,
                nomeSocial,
                cpf,
                email,
                telefone,
                rg,
                genero,
                data_nascimento: dataNascimento,
            };
            onSubmit(clienteAtualizado);
        },
        [cliente, nome, nomeSocial, cpf, email, telefone, rg, genero, dataNascimento, onSubmit]
    );

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Atualizar Cliente</h2>
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
                        <input id="nome" type="text" className={styles.input} value={nome} onChange={e => setNome(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nomeSocial" className={styles.label}>
                            Nome social
                        </label>
                        <input id="nomeSocial" type="text" className={styles.input} value={nomeSocial} onChange={e => setNomeSocial(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            E-mail
                        </label>
                        <input id="email" type="email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="telefone" className={styles.label}>
                            Telefone
                        </label>
                        <input id="telefone" type="text" className={styles.input} value={telefone} onChange={e => setTelefone(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="rg" className={styles.label}>
                            RG
                        </label>
                        <input id="rg" type="text" className={styles.input} value={rg} onChange={e => setRg(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="genero" className={styles.label}>
                            Gênero
                        </label>
                        <select id="genero" className={styles.input} value={genero} onChange={e => setGenero(e.target.value)}>
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
                        <input id="data_nascimento" type="date" className={styles.input} value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
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

export default AtualizarClienteForm;
