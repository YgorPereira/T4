import React, { Component, ChangeEvent } from "react";
import styles from "./Table.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import AtualizarProdutoForm from "../Forms/Atualizacao/atualizacaoProduto";

type Produto = {
    id: number;
    nome: string;
    preco: number;
};

type State = {
    produtos: Produto[];
    filtro: string;
    pagina: number;
    editandoProduto: Produto | null;
};

export default class ProdutosTable extends Component<{}, State> {
    state: State = {
        filtro: "",
        pagina: 1,
        editandoProduto: null,
        produtos: [
            { id: 1, nome: "Shampoo Hidratante", preco: 29.90 },
            { id: 2, nome: "Condicionador Nutritivo", preco: 32.50 },
            { id: 3, nome: "Máscara Capilar", preco: 45.00 },
            { id: 4, nome: "Óleo Reparador de Pontas", preco: 38.90 },
            { id: 5, nome: "Spray Fixador de Cabelo", preco: 27.00 },
            { id: 6, nome: "Batom Matte Vermelho", preco: 19.90 },
            { id: 7, nome: "Base Líquida", preco: 39.90 },
            { id: 8, nome: "Pó Compacto", preco: 24.90 },
            { id: 9, nome: "Paleta de Sombras", preco: 59.90 },
            { id: 10, nome: "Delineador Líquido", preco: 22.50 },
            { id: 11, nome: "Blush Rosado", preco: 18.90 },
            { id: 12, nome: "Removedor de Maquiagem", preco: 16.50 },
            { id: 13, nome: "Creme para Pentear", preco: 28.00 },
            { id: 14, nome: "Leave-in Protetor Térmico", preco: 34.90 },
            { id: 15, nome: "Gel de Sobrancelha", preco: 21.00 }
        ]
    };

    produtosPorPagina = 8;

    handleFiltro = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ filtro: event.target.value, pagina: 1 });
    };

    handleExcluir = (produto: Produto) => {
        this.setState((prevState) => ({
            produtos: prevState.produtos.filter(p => p.id !== produto.id)
        }));
    };

    handleEditar = (produto: Produto) => {
        this.setState({ editandoProduto: produto });
    };

    handleAtualizarProduto = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Produto atualizado com sucesso!");
        this.setState({ editandoProduto: null });
    };

    trocarPagina = (novaPagina: number) => {
        this.setState({ pagina: novaPagina });
    };

    render() {
        const { produtos, filtro, pagina, editandoProduto } = this.state;
        if (editandoProduto) {
            return (
                <AtualizarProdutoForm
                    onSubmit={this.handleAtualizarProduto}
                />
            );
        }
        const filtrados = produtos.filter(p =>
            p.nome.toLowerCase().includes(filtro.toLowerCase())
        );
        const totalPaginas = Math.ceil(filtrados.length / this.produtosPorPagina);
        const inicio = (pagina - 1) * this.produtosPorPagina;
        const fim = inicio + this.produtosPorPagina;
        const produtosPagina = filtrados.slice(inicio, fim);

        return (
            <div className={styles.tabela}>
                <h2>Produtos de Beleza</h2>
                <input
                    type="text"
                    placeholder="Buscar por nome do produto"
                    value={filtro}
                    onChange={this.handleFiltro}
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
                                        <button onClick={() => this.handleEditar(produto)} className={styles.acaoBtn}>
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => this.handleExcluir(produto)} className={styles.acaoBtn}>
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
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(p =>
                            <button
                                key={p}
                                onClick={() => this.trocarPagina(p)}
                                className={p === pagina ? styles.ativo : ""}
                            >
                                {p}
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    }
}