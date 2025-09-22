import { useEffect } from "react";
import type { Vehicle } from '../../types/index.ts';
import style from "./ShipModal.module.scss";

interface IShipModal {
    isActive: Boolean;
    ship: Vehicle | null;
    closeModal: ()=> void
}

const ShipModal = ({ isActive, ship, closeModal }: IShipModal) => {

    useEffect(()=> {
        if (isActive) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isActive]);

    return (
        <>
            <div className={`${style.modal} ${isActive ? style.active : ''}`} onClick={closeModal}>
                <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                    <button className={style.closeModal} type="button" aria-label="Закрыть модальное окно" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.00015 4.58569L12.0002 10.5857L18.0002 4.58569L19.4144 5.99991L13.4144 11.9999L19.4144 17.9999L18.0002 19.4141L12.0002 13.4141L6.00015 19.4141L4.58594 17.9999L10.5859 11.9999L4.58594 5.99991L6.00015 4.58569Z" /></svg>
                    </button>
                    <div className={style.modalImg}>
                        <img src={ship?.icons.large || ship?.icons.medium} alt={ship?.title} />
                    </div>
                    <div className={style.modalInfo}>
                        <h2 className={style.modalTitle}>{ship?.title}</h2>
                        <p className={style.modalDescription}>{ ship?.description }</p>
                        <div className={style.modalProperties}>
                            <span>Уровень {ship?.level}</span> |
                            <span> {ship?.nation.title}</span> |
                            <span> {ship?.type.title}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShipModal;