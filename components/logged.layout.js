import React from 'react'
import styles from './logged.layout.module.css'
import {Grid, Sidebar, Menu, Checkbox, Segment, Icon, Button, Ref, Sticky} from 'semantic-ui-react'

function Layout({children}) {
  const [visible, setVisible] = React.useState(false)
  const divRef = React.useRef()

  return (
    <Sidebar.Pushable style={{transform:"none"}}>
      <Sidebar
        as={Menu}
        animation='scale down'
        icon='labeled'
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='very thin'
        compact
        size="mini"
      >
        <Menu.Item as='a'>
          <Icon name='calendar plus' />
          Novo Pedido
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='tasks' />
          Gerenciar
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher>
        <Ref innerRef={divRef}>
          <div className={styles.content}>

              {children}

            <Sticky context={divRef}>
              <div className={styles["fab-button"]}>
                <Button
                  circular
                  color="orange"
                  icon="list alternate"
                  onClick={() => setVisible(true)}
                />
              </div>
            </Sticky>
          </div>
        </Ref>
      </Sidebar.Pusher>
      <footer>
        Link da Planilha:
        <a
          target="_blank"
          href="https://docs.google.com/spreadsheets/d/1-Z1rQUBstJeTAkH2FRvDysbylnoX-GbdYfZB3Bj26ZI/edit?usp=sharing">
          Hokkaido Matsuri 2020 - BD
        </a> - Desenvolvido por Toshi Nakano
      </footer>
    </Sidebar.Pushable>
  )
}

export default Layout
