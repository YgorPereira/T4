import React from "react";
import styles from "./homepage.module.css";

type Props = {
  onSelecionar: (
    tela: string,
    evento: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

export default function HomePage({ onSelecionar }: Props) {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.tituloPrincipal}>Bem-vindo ao Web Beauty</h1>

      <div className={styles.secoes}>
        <Section
          titulo="Cadastrar Cliente"
          descricao="Preencha o formulário para adicionar um novo cliente ao sistema."
          tela="Cliente"
          onSelecionar={onSelecionar}
        />
        <Section
          titulo="Cadastrar Serviço"
          descricao="Adicione um novo serviço que será oferecido no seu estabelecimento."
          tela="Serviço"
          onSelecionar={onSelecionar}
        />
        <Section
          titulo="Cadastrar Produto"
          descricao="Registre um novo produto no catálogo."
          tela="Produto"
          onSelecionar={onSelecionar}
        />
        <Section
          titulo="Clientes"
          descricao="Visualize a lista de clientes cadastrados. Você pode editar ou excluir um cliente."
          tela="Clientes"
          onSelecionar={onSelecionar}
        />
        <Section
          titulo="Serviços"
          descricao="Veja todos os serviços cadastrados, com opções para editar ou excluir."
          tela="Serviços"
          onSelecionar={onSelecionar}
        />
        <Section
          titulo="Produtos"
          descricao="Consulte a lista de produtos disponíveis. Edite ou remova produtos conforme necessário."
          tela="Produtos"
          onSelecionar={onSelecionar}
        />
      </div>
    </div>
  );
}

function Section({
  titulo,
  descricao,
  tela,
  onSelecionar,
}: {
  titulo: string;
  descricao: string;
  tela: string;
  onSelecionar: (
    tela: string,
    evento: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitulo}>{titulo}</h2>
      <p className={styles.cardDescricao}>{descricao}</p>
      <button
        className={styles.botao}
        onClick={(e) => onSelecionar(tela, e)}
      >
        Acessar {titulo}
      </button>
    </div>
  );
}
