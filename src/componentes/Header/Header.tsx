import React from "react";
import styles from "./Header.module.css";
import Dropdown from "../Dropdown/Dropdown";

type Props = {
    titulo: string;
    onSelecionar: (botao: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Header: React.FC<Props> = ({ titulo, onSelecionar }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>{titulo}</div>
                <nav>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <button
                                type="button"
                                className={styles.navLink}
                                onClick={e => onSelecionar("Clientes", e)}
                            >
                                Clientes
                            </button>
                        </li>
                        <li className={styles.navItem}>
                            <button
                                type="button"
                                className={styles.navLink}
                                onClick={e => onSelecionar("Serviços", e)}
                            >
                                Serviços
                            </button>
                        </li>
                        <li className={styles.navItem}>
                            <button
                                type="button"
                                className={styles.navLink}
                                onClick={e => onSelecionar("Produtos", e)}
                            >
                                Produtos
                            </button>
                        </li>
                        <li className={styles.navItem}>
                            <Dropdown
                                label="Cadastros"
                                options={["Cliente", "Serviço", "Produto"]}
                                onSelect={onSelecionar}
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;