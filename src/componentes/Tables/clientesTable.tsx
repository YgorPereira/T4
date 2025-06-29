import React, { useState, useEffect, useCallback } from "react";
import styles from "./Table.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import AtualizarClienteForm from "../Forms/Atualizacao/atualizacaoCliente";
import api from "../../services/api";
import { Cliente } from "../../models/types";

const ClientesTable: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [filtro, setFiltro] = useState("");
    const [pagina, setPagina] = useState(1);
    const [editandoCliente, setEditandoCliente] = useState<Cliente | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const clientesPorPagina = 8;

    const carregarClientes = useCallback(async () => {
        setCarregando(true);
        setErro(null);
        try {
            const response = await api.get("/clientes");
            const dadosApi: Cliente[] = response.data;

            setClientes(dadosApi);
        } catch (e: any) {
            setErro(e.message || "Erro ao buscar clientes");
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarClientes();
    }, [carregarClientes]);

    const handleExcluir = useCallback(async (cliente: Cliente) => {
        const confirmar = window.confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`);
        if (!confirmar) return;

        try {
            await api.delete("/cliente/excluir", {
                data: { id: cliente.id }
            });
            setClientes(prev => prev.filter(c => c.id !== cliente.id));
            console.log(`Cliente ${cliente.id} excluído com sucesso.`);
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluir cliente.");
        }
    }, []);

    const handleEditar = useCallback((cliente: Cliente) => {
        setEditandoCliente(cliente);
    }, []);

    const handleAtualizarCliente = useCallback(
        (clienteAtualizado: Cliente) => {
            setClientes((prev) =>
                prev.map((c) => (c.id === clienteAtualizado.id ? clienteAtualizado : c))
            );
            setEditandoCliente(null);
        },
        []
    );

    const handleFiltro = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(e.target.value);
        setPagina(1);
    };

    const trocarPagina = (novaPagina: number) => {
        setPagina(novaPagina);
    };

    const filtroMinusculo = filtro.toLowerCase();
    const clientesFiltrados = clientes.filter(
        (c) =>
            c.nome.toLowerCase().includes(filtroMinusculo) ||
            c.sobreNome.toLowerCase().includes(filtroMinusculo)
    );

    const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);
    const inicio = (pagina - 1) * clientesPorPagina;
    const fim = inicio + clientesPorPagina;
    const clientesPagina = clientesFiltrados.slice(inicio, fim);

    if (editandoCliente) {
        return (
            <AtualizarClienteForm
                cliente={editandoCliente}
                onSubmit={handleAtualizarCliente}
                onCancelar={() => setEditandoCliente(null)}
            />
        );
    }

    return (
        <div className={styles.tabela}>
            <h2>Clientes Registrados</h2>

            {erro && <div className={styles.erro}>{erro}</div>}

            <input
                type="text"
                placeholder="Buscar por nome ou sobrenome"
                value={filtro}
                onChange={handleFiltro}
                className={styles.inputBusca}
                disabled={carregando}
            />

            {carregando && clientes.length === 0 ? (
                <p>Carregando clientes...</p>
            ) : clientesPagina.length === 0 ? (
                <p>Nenhum cliente encontrado.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesPagina.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.sobreNome}</td>
                                    <td>{cliente.endereco?.cidade || "-"}</td>
                                    <td>{cliente.endereco?.estado || "-"}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEditar(cliente)}
                                            className={styles.acaoBtn}
                                            disabled={carregando}
                                            title="Editar"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => cliente.id && handleExcluir(cliente)}
                                            className={styles.acaoBtn}
                                            disabled={carregando}
                                            title="Excluir"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPaginas > 1 && (
                        <div className={styles.paginacao}>
                            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                                (paginaAtual) => (
                                    <button
                                        key={paginaAtual}
                                        onClick={() => trocarPagina(paginaAtual)}
                                        className={paginaAtual === pagina ? styles.ativo : ""}
                                        disabled={carregando}
                                    >
                                        {paginaAtual}
                                    </button>
                                )
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ClientesTable;
