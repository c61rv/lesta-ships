import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { VehicleFilters } from '../types';

const useVehicleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<VehicleFilters>({
    nation: searchParams.get('nation') || null,
    type: searchParams.get('type') || null,
    level: searchParams.get('level') ? parseInt(searchParams.get('level')!) : null,
  });

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (filters.nation) newSearchParams.set('nation', filters.nation);
    if (filters.type) newSearchParams.set('type', filters.type);
    if (filters.level) newSearchParams.set('level', filters.level.toString());
    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);

  return { filters, setFilters };
};

export default useVehicleFilters;