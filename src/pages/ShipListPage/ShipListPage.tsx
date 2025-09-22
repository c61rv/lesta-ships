import React, { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_VEHICLES } from '../../api/queries';
import type { Vehicle, FilterOptions, FilterOptionItem } from '../../types';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import useVehicleFilters from '../../hooks/useShipFilters';
import VehicleListContent from '../../components/ShipList/ShipList';
import styles from './ShipListPage.module.scss';

const VehicleListPage: React.FC = () => {
  const { filters, setFilters } = useVehicleFilters();

  const { loading, error, data } = useQuery<{
    vehicles: Vehicle[];
    nations: FilterOptionItem[];
  }>(GET_VEHICLES, {
    variables: {
      languageCode: "ru",
    },
  });

  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (data?.vehicles) {
      let currentVehicles = [...data.vehicles];

      if (filters.nation) {
        currentVehicles = currentVehicles.filter(
          (v) => v.nation.name === filters.nation
        );
      }
      if (filters.type) {
        currentVehicles = currentVehicles.filter(
          (v) => v.type.name === filters.type
        );
      }
      if (filters.level) {
        currentVehicles = currentVehicles.filter(
          (v) => v.level === filters.level
        );
      }
      setFilteredVehicles(currentVehicles);
    } else {
      setFilteredVehicles([]);
    }
  }, [data?.vehicles, filters]);

  const filterOptions: FilterOptions = useMemo(() => {
    const allLevels = data?.vehicles
      ? Array.from(new Set(data.vehicles.map((v) => v.level))).sort((a, b) => a - b)
      : [];

    const generatedItemTypes: FilterOptionItem[] = [];
    if (data?.vehicles) {
      const uniqueTypeNames = new Set<string>();
      data.vehicles.forEach(vehicle => {
        if (vehicle.type && vehicle.type.name && !uniqueTypeNames.has(vehicle.type.name)) {
          generatedItemTypes.push({
            name: vehicle.type.name,
            title: vehicle.type.title
          });
          uniqueTypeNames.add(vehicle.type.name);
        }
      });
    }

    return {
      nations: data?.nations || [],
      itemTypes: generatedItemTypes,
      levels: allLevels,
    };
  }, [data]);


  return (
    <>
      <div className={styles.banner}>
        <p className={styles.banner__text}>«Мир кораблей» — ожившая история флота.</p>
        <h1 className={styles.banner__title}>Список всех кораблей</h1>
      </div>
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        options={filterOptions}
      />
      
      <VehicleListContent
        filteredVehicles={filteredVehicles}
        filterOptions={filterOptions}
        loading={loading}
        error={error}
      />
    
    </>
  );
};

export default VehicleListPage;