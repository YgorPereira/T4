import React, { useState, useCallback } from "react";
import styles from "./Table.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import AtualizarServicoForm from "../Forms/Atualizacao/atualizacaoServico";

type Servico = {
    id: number;
    nome: string;
    preco: number;
};

const ServicosTable: React.FC = () => {
    const [servicos, setServicos] = useState<Servico[]>([
        { id: 1, nome: "Corte de Cabelo", preco: 40 },
        { id: 2, nome: "Manicure", preco: 30 },
        { id: 3, nome: "Pedicure", preco: 35 },
        { id: 4, nome: "Massagem Relaxante", preco: 80 },
        { id: 5, nome: "Limpeza de Pele", preco: 60 },
        { id: 6, nome: "Depilação", preco: 50 },
        { id: 7, nome: "Sobrancelha", preco: 25 },
        { id: 8, nome: "Maquiagem", preco: 70 },
        { id: 9, nome: "Escova", preco: 45 },
        { id: 10, nome: "Hidratação Capilar", preco: 55 },
        { id: 11, nome: "Barba", preco: 25 },
        { id: 12, nome: "Coloração", preco: 120 },
    ]);
    const [filtro, setFiltro] = useState("");
    const [pagina, setPagina] = useState(1);
    const [editandoServico, setEditandoServico] = useState<Servico | null>(null);

    const servicosPorPagina = 8;

    const handleExcluir = useCallback((servico: Servico) => {
        setServicos(prev => prev.filter(s => s.id !== servico.id));
    }, []);

    const handleEditar = useCallback((servico: Servico) => {
        setEditandoServico(servico);
    }, []);

    const handleAtualizarServico = useCallback(
        (servicoAtualizado: Servico) => {
            setServicos(prev =>
                prev.map(s => (s.id === servicoAtualizado.id ? servicoAtualizado : s))
            );
            setEditandoServico(null);
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

    const servicosFiltrados = servicos.filter(s =>
        s.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    const totalPaginas = Math.ceil(servicosFiltrados.length / servicosPorPagina);
    const inicio = (pagina - 1) * servicosPorPagina;
    const fim = inicio + servicosPorPagina;
    const servicosPagina = servicosFiltrados.slice(inicio, fim);

    if (editandoServico) {
        return (
            <AtualizarServicoForm
            // servico={editandoServico}
            // onSubmit={handleAtualizarServico}
            // onCancelar={() => setEditandoServico(null)}
            />
        );
    }

    return (
        <div className={styles.tabela}>
            <h2>Serviços Registrados</h2>
            <input
                type="text"
                placeholder="Buscar por nome do serviço"
                value={filtro}
                onChange={handleFiltro}
                className={styles.inputBusca}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço (R$)</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {servicosPagina.length > 0 ? (
                        servicosPagina.map(servico => (
                            <tr key={servico.id}>
                                <td>{servico.id}</td>
                                <td>{servico.nome}</td>
                                <td>{servico.preco.toFixed(2)}</td>
                                <td>
                                    <button
                                        onClick={() => handleEditar(servico)}
                                        className={styles.acaoBtn}
                                        title="Editar"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleExcluir(servico)}
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
                            <td colSpan={4}>Nenhum serviço encontrado.</td>
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

export default ServicosTable;
