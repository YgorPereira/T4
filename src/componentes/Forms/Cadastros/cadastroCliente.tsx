import React, { useState, useEffect, useRef } from "react";
import styles from "./cadastro.module.css";
import api from "../../../services/api";

const CadastroClienteForm: React.FC = () => {
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro" | "">("");
    const [nome, setNome] = useState("");
    const [sobreNome, setSobreNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [genero, setGenero] = useState("");
    const [nascimento, setNascimento] = useState("");

    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [informacoesAdicionais, setInformacoesAdicionais] = useState("");

    const [podeEnviar, setPodeEnviar] = useState(false);
    const nomeInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const emailValido = email === "" || /\S+@\S+\.\S+/.test(email);
        const cpfValido = validaCPF(cpf);

        setPodeEnviar(
            nome.trim().length > 0 &&
            sobreNome.trim().length > 0 &&
            cpfValido &&
            genero !== "" &&
            nascimento !== "" &&
            estado !== "" &&
            cidade !== "" &&
            bairro !== "" &&
            rua !== "" &&
            numero !== "" &&
            emailValido
        );
    }, [nome, sobreNome, cpf, genero, nascimento, email, estado, cidade, bairro, rua, numero]);

    useEffect(() => {
        nomeInputRef.current?.focus();
    }, []);

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
        return resto === parseInt(cpf.substring(10, 11));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const cliente = {
            nome,
            sobreNome,
            endereco: {
                estado,
                cidade,
                bairro,
                rua,
                numero,
                codigoPostal,
                informacoesAdicionais,
            },
        };

        try {
            await api.post("/cliente/cadastrar", cliente);
            alert("Cliente cadastrado com sucesso!");
            setMensagem("Cliente cadastrado com sucesso!");
            setTipoMensagem("sucesso");
        } catch (error) {
            alert("Erro ao cadastrar cliente.");
            setMensagem("Erro ao cadastrar cliente.");
            setTipoMensagem("erro");
            console.error(error);
        }

        setNome("");
        setSobreNome("");
        setEmail("");
        setCpf("");
        setRg("");
        setTelefone("");
        setGenero("");
        setNascimento("");
        setEstado("");
        setCidade("");
        setBairro("");
        setRua("");
        setNumero("");
        setCodigoPostal("");
        setInformacoesAdicionais("");
    }

    return (
        <div className={styles.formContainer}>
            {mensagem && (
                <div
                    className={
                        tipoMensagem === "sucesso"
                            ? styles.sucesso
                            : styles.erro
                    }
                >
                    {mensagem}
                </div>
            )}


            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <h2 className={styles.title}>Cadastro de Cliente</h2>

                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nome" className={styles.label}>Nome *</label>
                        <input id="nome" className={styles.input} value={nome} onChange={e => setNome(e.target.value)} ref={nomeInputRef} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="sobreNome" className={styles.label}>Sobrenome *</label>
                        <input id="sobreNome" className={styles.input} value={sobreNome} onChange={e => setSobreNome(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>E-mail</label>
                        <input id="email" type="email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cpf" className={styles.label}>CPF *</label>
                        <input id="cpf" className={styles.input} value={cpf} onChange={e => setCpf(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="rg" className={styles.label}>RG</label>
                        <input id="rg" className={styles.input} value={rg} onChange={e => setRg(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="telefone" className={styles.label}>Telefone</label>
                        <input id="telefone" className={styles.input} value={telefone} onChange={e => setTelefone(e.target.value)} />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="genero" className={styles.label}>Gênero *</label>
                        <select id="genero" className={styles.input} value={genero} onChange={e => setGenero(e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="feminino">Feminino</option>
                            <option value="masculino">Masculino</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="nascimento" className={styles.label}>Nascimento *</label>
                        <input type="date" id="nascimento" className={styles.input} value={nascimento} onChange={e => setNascimento(e.target.value)} />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="estado" className={styles.label}>Estado *</label>
                        <input id="estado" className={styles.input} value={estado} onChange={e => setEstado(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cidade" className={styles.label}>Cidade *</label>
                        <input id="cidade" className={styles.input} value={cidade} onChange={e => setCidade(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="bairro" className={styles.label}>Bairro *</label>
                        <input id="bairro" className={styles.input} value={bairro} onChange={e => setBairro(e.target.value)} />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="rua" className={styles.label}>Rua *</label>
                        <input id="rua" className={styles.input} value={rua} onChange={e => setRua(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="numero" className={styles.label}>Número *</label>
                        <input id="numero" className={styles.input} value={numero} onChange={e => setNumero(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="codigoPostal" className={styles.label}>CEP</label>
                        <input id="codigoPostal" className={styles.input} value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="informacoesAdicionais" className={styles.label}>Informações adicionais</label>
                    <textarea id="informacoesAdicionais" className={styles.input} value={informacoesAdicionais} onChange={e => setInformacoesAdicionais(e.target.value)} />
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