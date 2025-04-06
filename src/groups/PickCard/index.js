import { Observer, useLocalObservable } from "mobx-react-lite";
import styled from 'styled-components'
import _ from 'lodash'
import { Fragment } from 'react'
import ResourceItem from "@/adaptor";

const Header = styled.div`
 font-weight: 600;
 font-size: 16px;
 padding: 5px;
 color: #555;
`
const Content = styled.div`
  border-radius: 10px;
  background-color: #eee;
  padding: 10px 10px 0;
`
const ScrollWrap = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: auto;
  box-sizing: border-box;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  &>div:first-child {
    margin-left: 0;
  }
`;
const ItemWrap = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`

const ItemTitle = styled.div`
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2;
  height: 34px;
  line-height: 1.2;
  margin: 5px 0;
`
export default function CCard({ self, children }) {
  const local = useLocalObservable(() => ({
    show: false,
    close() {
      local.show = false;
    },
    open() {
      local.show = true;
    }
  }))
  return <Observer>{() => (
    <div
      style={{
        flex: 0,
        ...self.style,
      }}
    >
      {children}
      <Header>
        {self.title}
      </Header>
      <Content>
        <ScrollWrap>
          {self.resources?.map(item => (<Fragment key={item._id}>
            <ResourceItem item={item} />
          </Fragment>))}
        </ScrollWrap>
      </Content>
    </div>
  )
  }</Observer >
}