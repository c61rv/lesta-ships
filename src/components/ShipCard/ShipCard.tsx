import React from 'react';
import type { Vehicle } from '../../types';
import styles from './ShipCard.module.scss';
import waves from '../../assets/img/waves.png';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (ship: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick }) => {
  function openModal() {
    onClick(vehicle);
  }

  return (
    <div className={styles.shipCard} onClick={openModal}>
        <div className={styles.shipCard__img}>
          <img className={styles.shipCard__ship} src={vehicle.icons.medium} alt={vehicle.title} />
          <img className={styles.shipCard__flag} src={vehicle.nation.icons.large} alt={vehicle.nation.title} />
          <img className={styles.shipCard__waves} src={waves} alt="Волны" />
        </div>
        <div className={styles.shipCard__content}>
          <h3 className={styles.shipCard__title}>{vehicle.title}</h3>
          <p className={styles.shipCard__details}>
            <span> Уровень {vehicle.level}</span> |
            <span> {vehicle.nation.title}</span> |
            <span> {vehicle.type.title}</span>
          </p>
        </div>
    </div>
  );
};

export default VehicleCard;