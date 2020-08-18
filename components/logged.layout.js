import React from 'react'
import styles from './logged.layout.module.css'
import {Grid, Sidebar, Menu, Checkbox, Segment, Icon} from 'semantic-ui-react'

function Layout({ children }) {
  const [visible, setVisible] = React.useState(false)
  return (
    <div>
      <main>
        <Grid columns={1}>
          <Grid.Column>
            <Checkbox
              checked={visible}
              label={{ children: <code>visible</code> }}
              onChange={(e, data) => setVisible(data.checked)}
            />
          </Grid.Column>

          <Grid.Column>
            <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                width='thin'
              >
                <Menu.Item as='a'>
                  <Icon name='home' />
                  Home
                </Menu.Item>
                <Menu.Item as='a'>
                  <Icon name='gamepad' />
                  Games
                </Menu.Item>
                <Menu.Item as='a'>
                  <Icon name='camera' />
                  Channels
                </Menu.Item>
              </Sidebar>

              <Sidebar.Pusher dimmed={visible}>
                {children}
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
      </main>
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
