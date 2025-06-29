import { Component } from "react";
import Header from "./Header/Header";
import HomePage from "../pages/homepage";
import ClientesTable from "./Tables/clientesTable";
import CadastroClienteForm from "./Forms/Cadastros/cadastroCliente";

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Home'
        };
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
                titulo="Web Beauty"
                onSelecionar={this.selecionarView}
            />
        );
        switch (this.state.tela) {
            case "Home":
                return (
                    <>
                        {navbar}
                        <HomePage onSelecionar={this.selecionarView} />
                    </>
                );
            case "Clientes":
                return (
                    <>
                        {navbar}
                        <ClientesTable />
                    </>
                );
            case "Cliente":
                return (
                    <>
                        {navbar}
                        <CadastroClienteForm />
                    </>
                );
            default:
                return navbar;
        }
    }
}