import { Observer } from "mobx-react-lite";
import Widgets from './index.js'

function Component({ self }) {
  const Widget = Widgets[self.type];
  if (!Widget) {
    return <div>NotFound: {self.type}</div>
  }
  return <Observer>{() => (
    <Widget self={self} >
      {self.children.map(child => (
        <Component key={child._id} self={child} />
      ))}
    </Widget>
  )}</Observer>
}

export default function Auto({ components }) {
  return <Observer>{() => (
    components.map(component => <Component key={component._id} self={component} />)
  )}</Observer>
}