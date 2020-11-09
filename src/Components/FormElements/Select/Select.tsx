import React from "react";
import styles from "./Select.module.scss";

interface selectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ onChange, value }: selectProps): React.ReactElement => (
  <select className={styles.select} value={value} onChange={onChange}>
    <option value="users">Users</option>
    <option value="repositories" defaultValue="repositories">
      Repostories
    </option>
  </select>
);

export default Select;
