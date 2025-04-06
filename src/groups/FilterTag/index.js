import { Observer } from 'mobx-react-lite';
import styled from 'styled-components';

const Tag = styled.span`
  display: inline-block;
  border-radius: 2px;
  padding: 2px 4px;
  margin-right: 4px;
  white-space: nowrap;
  font-size: 11px;
`

export default function ComponentFilterTag({ self, ...props }) {
  return <Observer>{() => (
    <Tag style={self.attrs.selected ? { color: 'white', backgroundColor: '#3498db', border: '1px solid #3498db' } : { color: '#bbb', backgroundColor: 'white', border: '1px solid #bbb' }} onClick={() => {
      if ((props).onSelect) {
        (props).onSelect(self._id);
      }
    }}>{self.title}</Tag>
  )
  }</Observer >
}