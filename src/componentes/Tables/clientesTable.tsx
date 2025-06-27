import React, { useState, useEffect, useCallback } from "react";
import styles from "./Table.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import AtualizarClienteForm from "../Forms/Atualizacao/atualizacaoCliente";

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

const ClientesTable: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([
        { id: 1, nome: "Alice Souza", nomeSocial: "Alice S.", genero: "Feminino", cpf: "12345678901" },
        { id: 2, nome: "Bruno Lima", nomeSocial: "Bruno L.", genero: "Masculino", cpf: "98765432109" },
        { id: 3, nome: "Carla Dias", nomeSocial: "Carla D.", genero: "Feminino", cpf: "45678912345" },
        { id: 4, nome: "Daniel Alves", nomeSocial: "Dani", genero: "Masculino", cpf: "32165498712" },
        { id: 5, nome: "Elisa Martins", nomeSocial: "Elisa M.", genero: "Feminino", cpf: "15975348620" },
        { id: 6, nome: "Felipe Torres", nomeSocial: "F. Torres", genero: "Masculino", cpf: "78945612333" },
        { id: 7, nome: "Gabriela Rocha", nomeSocial: "Gabi", genero: "Feminino", cpf: "74125896314" },
        { id: 8, nome: "Henrique Costa", nomeSocial: "Henrique C.", genero: "Masculino", cpf: "85214796325" },
        { id: 9, nome: "Isabela Nunes", nomeSocial: "Isa", genero: "Feminino", cpf: "95175345636" },
        { id: 10, nome: "João Pedro", nomeSocial: "JP", genero: "Masculino", cpf: "75395145647" },
        { id: 11, nome: "Karen Silva", nomeSocial: "Karen S.", genero: "Feminino", cpf: "14725836958" },
        { id: 12, nome: "Lucas Pinto", nomeSocial: "Lucas P.", genero: "Masculino", cpf: "36925814769" },
        { id: 13, nome: "Marina Lopes", nomeSocial: "Marina L.", genero: "Feminino", cpf: "25814736970" },
        { id: 14, nome: "Nicolas Teixeira", nomeSocial: "Nico", genero: "Masculino", cpf: "12378945681" },
        { id: 15, nome: "Olivia Cunha", nomeSocial: "Olivia C.", genero: "Feminino", cpf: "32198765492" },
        { id: 16, nome: "Paulo Viana", nomeSocial: "Paulo V.", genero: "Masculino", cpf: "65412378903" },
        { id: 17, nome: "Renata Barbosa", nomeSocial: "Renata B.", genero: "Feminino", cpf: "45632198714" },
        { id: 18, nome: "Samuel Vieira", nomeSocial: "Samuel V.", genero: "Masculino", cpf: "98732165425" },
        { id: 19, nome: "Tatiane Ferreira", nomeSocial: "Tati", genero: "Feminino", cpf: "74196385236" },
        { id: 20, nome: "Vinicius Castro", nomeSocial: "Vini", genero: "Masculino", cpf: "96385274147" }
    ]);
    const [filtro, setFiltro] = useState("");
    const [pagina, setPagina] = useState(1);
    const [editandoCliente, setEditandoCliente] = useState<Cliente | null>(null);

    const clientesPorPagina = 8;

    const handleExcluir = useCallback((cliente: Cliente) => {
        setClientes(prev => prev.filter(c => c.id !== cliente.id));
    }, []);

    const handleEditar = useCallback((cliente: Cliente) => {
        setEditandoCliente(cliente);
    }, []);

    const handleAtualizarCliente = useCallback(
        (clienteAtualizado: Cliente) => {
            setClientes(prev =>
                prev.map(c => (c.id === clienteAtualizado.id ? clienteAtualizado : c))
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

    // Filtra clientes conforme filtro e paginação
    const clientesFiltrados = clientes.filter(c =>
        c.nome.toLowerCase().includes(filtro.toLowerCase())
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
            <input
                type="text"
                placeholder="Buscar por nome"
                value={filtro}
                onChange={handleFiltro}
                className={styles.inputBusca}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Nome Social</th>
                        <th>Gênero</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesPagina.length > 0 ? (
                        clientesPagina.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.nomeSocial}</td>
                                <td>{cliente.genero}</td>
                                <td>{cliente.cpf}</td>
                                <td>
                                    <button
                                        onClick={() => handleEditar(cliente)}
                                        className={styles.acaoBtn}
                                        title="Editar"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleExcluir(cliente)}
                                        className={styles.acaoBtn}
                                        title="Excluir"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>Nenhum cliente encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {totalPaginas > 1 && (
                <div className={styles.paginacao}>
                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(paginaAtual => (
                        <button
                            key={paginaAtual}
                            onClick={() => trocarPagina(paginaAtual)}
                            className={paginaAtual === pagina ? styles.ativo : ""}
                        >
                            {paginaAtual}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientesTable;
