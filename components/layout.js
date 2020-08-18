import styles from './layout.module.css'

function Layout({ children }) {
  return (
    <div className={styles.content}>
      <main>{children}</main>
      <footer>
        Desenvolvido por Toshi Nakano
      </footer>
    </div>
  )
}

export default Layout
