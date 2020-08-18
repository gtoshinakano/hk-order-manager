import styles from './logged.layout.module.css'

function Layout({ children }) {
  return (
    <div className={styles.content}>
      <main>{children}</main>
      <footer>
        Link da Planilha:
        <a
          target="_blank"
          href="https://docs.google.com/spreadsheets/d/1-Z1rQUBstJeTAkH2FRvDysbylnoX-GbdYfZB3Bj26ZI/edit?usp=sharing">
          Hokkaido Matsuri 2020 - BD
        </a> - Desenvolvido por Toshi Nakano
      </footer>
    </div>
  )
}

export default Layout