import { init } from '@rematch/core'
import { reducer as formReducer } from 'redux-form'
import initializeFirebase from './initializeFirebase'
import * as models from './models'

const store = init({
  models,
  redux: {
    reducers: {
      form: formReducer,
    },
  },
})

initializeFirebase()

export default store
