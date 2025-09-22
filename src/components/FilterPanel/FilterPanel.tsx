import React from 'react';
import type { FilterOptions, VehicleFilters } from '../../types';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  filters: VehicleFilters;
  setFilters: (filters: VehicleFilters) => void;
  options: FilterOptions;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters, options }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value === 'all' ? null : (name === 'level' ? parseInt(value) : value),
    });
  };

  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterGroup}>
        <label htmlFor="nation">Нация:</label>
        <select className={styles.formSelect} id="nation" name="nation" value={filters.nation || 'all'} onChange={handleFilterChange}>
          <option value="all">Все</option>
          {options.nations.map((nation) => (
            <option key={nation.name} value={nation.name}>
              {nation.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="type">Класс:</label>
        <select className={styles.formSelect} id="type" name="type" value={filters.type || 'all'} onChange={handleFilterChange}>
          <option value="all">Все</option>
          {options.itemTypes.map((type) => (
            <option key={type.name} value={type.name}>
              {type.title}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="level">Уровень:</label>
        <select className={styles.formSelect} id="level" name="level" value={filters.level || 'all'} onChange={handleFilterChange}>
          <option value="all">Все</option>
          {options.levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;