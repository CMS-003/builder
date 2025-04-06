
import { Observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Acon from '../../components/Acon'

const Header = styled.div`
 font-weight: 600;
 font-size: 16px;
 padding: 5px;
 color: #555;
`
const Wrap = styled.div`
border-radius: 10px;
background-color: #eee;
`
const Content = styled.div`
  min-height: 120px;
`
export default function CRandom({ self, mode, drag, dnd, children }) {
  return <Observer>{() => (
    <div
      style={{ flex: 0, ...self.style, }}
    >
      {children}
      <Header>
        {self.title}
      </Header>
      <Wrap>
        <Content>

        </Content>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}><Acon icon='SyncOutlined' /></div>
      </Wrap>
    </div>
  )}</Observer >
}