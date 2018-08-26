import config from './config'
import init from './init'

const { projectId, ...rest } = config

const app = init(projectId, rest)

export default app
