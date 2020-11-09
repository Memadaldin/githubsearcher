import React from "react";
import styles from "./TextField.module.scss";

interface textFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
const TextField = ({
  value,
  onChange,
  placeholder,
}: textFieldProps): React.ReactElement => (
  <input
    className={styles.input}
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default TextField;
