import React, { useState, useEffect, useRef } from "react";
import styles from "./cadastro.module.css";

const CadastroClienteForm: React.FC = () => {
    // Estados para cada campo
    const [nome, setNome] = useState("");
    const [nomeSocial, setNomeSocial] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [genero, setGenero] = useState("");
    const [nascimento, setNascimento] = useState("");

    const [podeEnviar, setPodeEnviar] = useState(false);
    const nomeInputRef = useRef<HTMLInputElement>(null);

    // Validação simples: nome, cpf válido, gênero selecionado e nascimento preenchido
    useEffect(() => {
        const emailValido = email === "" || /\S+@\S+\.\S+/.test(email);
        const cpfValido = validaCPF(cpf);
        setPodeEnviar(
            nome.trim().length > 0 &&
            cpfValido &&
            genero !== "" &&
            nascimento !== "" &&
            emailValido
        );
    }, [nome, cpf, genero, nascimento, email]);

    // Foco automático no input nome
    useEffect(() => {
        nomeInputRef.current?.focus();
    }, []);

    // Validação simples de CPF (pode melhorar depois)
    function validaCPF(cpf: string) {
        cpf = cpf.replace(/[^\d]+/g, "");
        if (cpf.length !== 11) return false;
        if (/^(\d)\1+$/.test(cpf)) return false;
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!podeEnviar) return;

        alert(`Cliente cadastrado:
Nome: ${nome}
Nome social: ${nomeSocial}
Email: ${email}
CPF: ${cpf}
RG: ${rg}
Telefone: ${telefone}
Gênero: ${genero}
Nascimento: ${nascimento}`);

        // Resetar form
        setNome("");
        setNomeSocial("");
        setEmail("");
        setCpf("");
        setRg("");
        setTelefone("");
        setGenero("");
        setNascimento("");
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <h2 className={styles.title}>Cadastro de Cliente</h2>

                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nome" className={styles.label}>Nome *</label>
                        <input
                            id="nome"
                            type="text"
                            className={styles.input}
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            ref={nomeInputRef}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="nomeSocial" className={styles.label}>Nome social</label>
                        <input
                            id="nomeSocial"
                            type="text"
                            className={styles.input}
                            value={nomeSocial}
                            onChange={e => setNomeSocial(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>E-mail</label>
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cpf" className={styles.label}>CPF *</label>
                        <input
                            id="cpf"
                            type="text"
                            className={styles.input}
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            placeholder="000.000.000-00"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="rg" className={styles.label}>RG</label>
                        <input
                            id="rg"
                            type="text"
                            className={styles.input}
                            value={rg}
                            onChange={e => setRg(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="telefone" className={styles.label}>Telefone</label>
                        <input
                            id="telefone"
                            type="text"
                            className={styles.input}
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="genero" className={styles.label}>Gênero *</label>
                        <select
                            id="genero"
                            className={styles.input}
                            value={genero}
                            onChange={e => setGenero(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="feminino">Feminino</option>
                            <option value="masculino">Masculino</option>
                            <option value="outro">Outro</option>
                            <option value="nao_informar">Prefiro não informar</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="nascimento" className={styles.label}>Data de Nascimento *</label>
                        <input
                            id="nascimento"
                            type="date"
                            className={styles.input}
                            value={nascimento}
                            onChange={e => setNascimento(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={!podeEnviar}
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CadastroClienteForm;
