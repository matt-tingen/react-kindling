import { init } from '@rematch/core'
import initializeFirebase from './initializeFirebase'
import * as models from './models'

const store = init({
  models,
})

initializeFirebase()

export default store
