import React, { useState, useCallback } from "react";
import styles from "./Table.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import AtualizarProdutoForm from "../Forms/Atualizacao/atualizacaoProduto";

type Produto = {
    id: number;
    nome: string;
    preco: number;
};

const ProdutosTable: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([
        { id: 1, nome: "Shampoo Hidratante", preco: 29.9 },
        { id: 2, nome: "Condicionador Nutritivo", preco: 32.5 },
        { id: 3, nome: "Máscara Capilar", preco: 45 },
        { id: 4, nome: "Óleo Reparador de Pontas", preco: 38.9 },
        { id: 5, nome: "Spray Fixador de Cabelo", preco: 27 },
        { id: 6, nome: "Batom Matte Vermelho", preco: 19.9 },
        { id: 7, nome: "Base Líquida", preco: 39.9 },
        { id: 8, nome: "Pó Compacto", preco: 24.9 },
        { id: 9, nome: "Paleta de Sombras", preco: 59.9 },
        { id: 10, nome: "Delineador Líquido", preco: 22.5 },
        { id: 11, nome: "Blush Rosado", preco: 18.9 },
        { id: 12, nome: "Removedor de Maquiagem", preco: 16.5 },
        { id: 13, nome: "Creme para Pentear", preco: 28 },
        { id: 14, nome: "Leave-in Protetor Térmico", preco: 34.9 },
        { id: 15, nome: "Gel de Sobrancelha", preco: 21 },
    ]);
    const [filtro, setFiltro] = useState("");
    const [pagina, setPagina] = useState(1);
    const [editandoProduto, setEditandoProduto] = useState<Produto | null>(null);

    const produtosPorPagina = 8;

    const handleExcluir = useCallback((produto: Produto) => {
        setProdutos(prev => prev.filter(p => p.id !== produto.id));
    }, []);

    const handleEditar = useCallback((produto: Produto) => {
        setEditandoProduto(produto);
    }, []);

    const handleAtualizarProduto = useCallback(
        (produtoAtualizado: Produto) => {
            setProdutos(prev =>
                prev.map(p => (p.id === produtoAtualizado.id ? produtoAtualizado : p))
            );
            setEditandoProduto(null);
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

    const produtosFiltrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
    const inicio = (pagina - 1) * produtosPorPagina;
    const fim = inicio + produtosPorPagina;
    const produtosPagina = produtosFiltrados.slice(inicio, fim);

    if (editandoProduto) {
        return (
            <AtualizarProdutoForm
            // produto={editandoProduto}
            // onSubmit={handleAtualizarProduto}
            // onCancelar={() => setEditandoProduto(null)}
            />
        );
    }

    return (
        <div className={styles.tabela}>
            <h2>Produtos de Beleza</h2>
            <input
                type="text"
                placeholder="Buscar por nome do produto"
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
                    {produtosPagina.length > 0 ? (
                        produtosPagina.map(produto => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.preco.toFixed(2)}</td>
                                <td>
                                    <button
                                        onClick={() => handleEditar(produto)}
                                        className={styles.acaoBtn}
                                        title="Editar"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleExcluir(produto)}
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
                            <td colSpan={4}>Nenhum produto encontrado.</td>
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

export default ProdutosTable;
