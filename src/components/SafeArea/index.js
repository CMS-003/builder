import { useStore } from "@/contexts/index.js";
import { Observer } from "mobx-react-lite";
import { FullHeight, FullHeightAuto, FullHeightFix } from "../style.js";

export default function SafeArea({
  height = '100%',
  top = 'env(safe-area-inset-top)',
  bot = 'env(safe-area-inset-bottom)',
  topBGC = 'transparent',
  botBGC = 'transparent',
  children,
}) {
  const store = useStore()
  return <Observer>{() => (
    <FullHeight style={{
      position: 'relative',
      width: '100%',
      height,
      boxSizing: 'border-box',
    }}>
      <FullHeightFix style={{ paddingTop: top, background: topBGC, }} />
      <div style={{ flex: 1, display: 'flex', overflow: 'auto', flexDirection: 'column' }}>
        {children}
      </div>
      <FullHeightFix style={{ paddingBottom: bot, backgroundColor: botBGC }} />
    </FullHeight>
  )}</Observer>
}