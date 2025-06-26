import { Component } from "react";
import Header from "./Header/Header";
import ServicosTable from "./Tables/servicosTable";
import ClientesTable from "./Tables/clientesTable";
import ProdutosTable from "./Tables/produtoTable";
import CadastroClienteForm from "./Forms/Cadastros/Cliente/cadastroCliente";
import CadastroServicoForm from "./Forms/Cadastros/Servico/cadastroServico";
import CadastroProdutoForm from "./Forms/Cadastros/Produto/cadastroProduto";

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        evento.preventDefault();
        this.setState({
            tela: novaTela
        });
    }
    render() {
        let navbar = (
            <Header
                titulo="header"
                onSelecionar={this.selecionarView}
            />
        );
        switch (this.state.tela) {
            case "Clientes":
                return (
                    <>
                        {navbar}
                        <ClientesTable/>
                    </>
                );
            case "Serviços":
                return (
                    <>
                        {navbar}
                        <ServicosTable/>
                    </>
                );
            case "Produtos":
                return (
                    <>
                        {navbar}
                        <ProdutosTable/>
                    </>
                );
            case "Cliente":
                return (
                    <>
                        {navbar}
                        <CadastroClienteForm />
                    </>
                );
            case "Serviço":
                return (
                    <>
                        {navbar}
                        <CadastroServicoForm />
                    </>
                );
            case "Produto":
                return (
                    <>
                        {navbar}
                        <CadastroProdutoForm />
                    </>
                );
            default:
                return navbar;
        }
    }
}