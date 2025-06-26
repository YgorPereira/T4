import React, { Component, ChangeEvent } from "react";
import styles from "./Table.module.css";

type Servico = {
    id: number;
    nome: string;
    preco: number;
};

type State = {
    servicos: Servico[];
    filtro: string;
    pagina: number;
};

export default class ServicosTable extends Component<{}, State> {
    state: State = {
        filtro: "",
        pagina: 1,
        servicos: [
            { id: 1, nome: "Corte de Cabelo", preco: 40.0 },
            { id: 2, nome: "Manicure", preco: 30.0 },
            { id: 3, nome: "Pedicure", preco: 35.0 },
            { id: 4, nome: "Massagem Relaxante", preco: 80.0 },
            { id: 5, nome: "Limpeza de Pele", preco: 60.0 },
            { id: 6, nome: "Depilação", preco: 50.0 },
            { id: 7, nome: "Sobrancelha", preco: 25.0 },
            { id: 8, nome: "Maquiagem", preco: 70.0 },
            { id: 9, nome: "Escova", preco: 45.0 },
            { id: 10, nome: "Hidratação Capilar", preco: 55.0 },
            { id: 11, nome: "Barba", preco: 25.0 },
            { id: 12, nome: "Coloração", preco: 120.0 }
        ]
    };

    servicosPorPagina = 8;

    handleFiltro = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ filtro: event.target.value, pagina: 1 });
    };

    trocarPagina = (novaPagina: number) => {
        this.setState({ pagina: novaPagina });
    };

    render() {
        const { servicos, filtro, pagina } = this.state;
        const filtrados = servicos.filter(s =>
            s.nome.toLowerCase().includes(filtro.toLowerCase())
        );
        const totalPaginas = Math.ceil(filtrados.length / this.servicosPorPagina);
        const inicio = (pagina - 1) * this.servicosPorPagina;
        const fim = inicio + this.servicosPorPagina;
        const servicosPagina = filtrados.slice(inicio, fim);

        return (
            <div className={styles.tabela}>
                <h2>Serviços Registrados</h2>
                <input
                    type="text"
                    placeholder="Buscar por nome do serviço"
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
                        </tr>
                    </thead>
                    <tbody>
                        {servicosPagina.length > 0 ? (
                            servicosPagina.map(servico => (
                                <tr key={servico.id}>
                                    <td>{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td>{servico.preco.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>Nenhum serviço encontrado.</td>
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