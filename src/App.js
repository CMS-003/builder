import { Observer, useLocalObservable } from 'mobx-react-lite';
import { useCallback } from 'react';
import store from './store';
import apis from './apis'
import { useEffectOnce } from 'react-use';
import { CenterXY } from './components'
import { Button } from 'antd-mobile';
import Router from './router.js'

function App() {
  const local = useLocalObservable(() => ({
    isError: false,
  }));
  const biu = useCallback((async () => {
    store.app.setBoot(true)
    const resp = await apis.boot();
    const respPage = await apis.getPageComponents('demo', 1)
    if (resp.code !== 0) {
      local.isError = true
      console.log(resp, '启动失败')
    } else {

    }
    store.app.setBoot(false)
  }), [local])
  useEffectOnce(() => {
    biu();
    window.addEventListener('online', () => {
      if (local.isError) {
        local.isError = false
        biu()
      }
    })
    window.addEventListener('orientationchange', () => {
      store.app.orientation = window.screen.orientation.angle
    })
  })
  return (
    <Observer>{() => {
      if (store.app.isBooting) {
        return <div>splash</div>
      } else if (local.isError) {
        return <Button
          style={{ width: 150 }}
          type="primary"
          onClick={() => {
            biu();
            local.isError = false;
          }}
        >
          {navigator.onLine ? '点击重试' : '您处于离线状态'}
        </Button>
      } else {
        return <Router />
      }
    }}</Observer>
  );
}

export default App;
