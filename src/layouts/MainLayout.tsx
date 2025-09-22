import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import logo from '../assets/img/logo.svg';

const MainLayout: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <a className={styles.logo} href="https://korabli.su/" aria-label='Ссылка на сайт'>
          <img src={logo} alt="Логотип" />
        </a>
        <a className={styles.headerBtn} href='https://korabli.su/ru/content/game/'>
          <span>Скачать игру</span>
        </a>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;