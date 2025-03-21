import { types } from 'mobx-state-tree';
import User from './user';
import App from './app'
import { storage } from '../utils'

storage.prefix = process.env.PUBLIC_URL

const Store = types.model('store', {
  app: App,
  user: User,
})

const store = Store.create({
  app: {
    debug: true,
  },
  user: {
    access_token: storage.getValue('access_token') || '',
    refresh_token: storage.getValue('refresh_token') || '',
  },
});

export default store;