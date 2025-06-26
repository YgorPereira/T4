import React, { useState } from "react";
import styles from "./Dropdown.module.css";

type Props = {
    label: string;
    options: string[];
    onSelect: (option: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Dropdown: React.FC<Props> = ({ label, options, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={styles.dropdown}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button type="button" className={styles.dropdownLabel}>
                {label}
            </button>
            {open && (
                <ul className={styles.dropdownMenu}>
                    {options.map(option => (
                        <li key={option}>
                            <button
                                type="button"
                                className={styles.dropdownItem}
                                onClick={e => onSelect(option, e)}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;