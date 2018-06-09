import _ from 'lodash'

const titleCase = _.flow(
  _.camelCase,
  _.upperFirst,
)

export default titleCase
