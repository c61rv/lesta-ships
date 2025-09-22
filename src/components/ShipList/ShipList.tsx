import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Vehicle, FilterOptions } from '../../types';
import VehicleCard from '../ShipCard/ShipCard';
import LoadingSpinner from '../Loading/Loading';
import ShipModal from '../ShipModal/ShipModal';
import styles from './ShipList.module.scss';

interface VehicleListContentProps {
  filteredVehicles: Vehicle[];
  filterOptions: FilterOptions;
  loading: boolean;
  error: Error | undefined;
}

const ITEMS_PER_LOAD = 9;

const VehicleListContent: React.FC<VehicleListContentProps> = ({
  filteredVehicles,
  loading,
  error,
}) => {
  const [displayedVehiclesCount, setDisplayedVehiclesCount] = useState(ITEMS_PER_LOAD);
  const observerTargetRef = useRef<HTMLDivElement>(null);

    const [ modal, setModal ] = useState(false);
    const [ modalShip, setModalShip ] = useState<Vehicle | null>(null);

  function openModal(ship:Vehicle) {
    if(!modalShip) {
    setModal(true);
    setModalShip(ship);
    }
  }

  function closeModal() {
    setModal(false);
    setTimeout(() => {
      setModalShip(null);
    }, 300);
  }

  useEffect(() => {
    setDisplayedVehiclesCount(ITEMS_PER_LOAD);
  }, [filteredVehicles]);

  const loadMoreItems = useCallback(() => {
    setDisplayedVehiclesCount((prevCount) => prevCount + ITEMS_PER_LOAD);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedVehiclesCount < filteredVehicles.length) {
          loadMoreItems();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    if (observerTargetRef.current) {
      observer.observe(observerTargetRef.current);
    }

    return () => {
      if (observerTargetRef.current) {
        observer.unobserve(observerTargetRef.current);
      }
    };
  }, [displayedVehiclesCount, filteredVehicles.length, loadMoreItems]);

  const vehiclesToDisplay = filteredVehicles.slice(0, displayedVehiclesCount);
  const hasMore = displayedVehiclesCount < filteredVehicles.length;

  if (loading && filteredVehicles.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className={styles.errorMessage}>Ошибка загрузки транспорта: {error.message}</p>;
  }

  if (filteredVehicles.length === 0 && !loading) {
    return <p className={styles.noResults}>Транспорт по заданным фильтрам не найден.</p>;
  }

  return (
    <>
      <div className={styles.shipsList}>
        {vehiclesToDisplay.map((vehicle) => (
          <VehicleCard key={vehicle.title} vehicle={vehicle} onClick={openModal}/>
        ))}
      </div>

      {hasMore && (
        <div ref={observerTargetRef} className={styles.loadingMore}>
          <LoadingSpinner />
        </div>
      )}
      <ShipModal isActive={modal} ship={modalShip} closeModal={closeModal}/>
    </>
  );
};

export default VehicleListContent;