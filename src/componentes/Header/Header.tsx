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
                <button
                    type="button"
                    className={styles.logo}
                    onClick={e => onSelecionar("Home", e)}
                >
                    {titulo}
                </button>
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
                            <Dropdown
                                label="Cadastros"
                                options={["Cliente"]}
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