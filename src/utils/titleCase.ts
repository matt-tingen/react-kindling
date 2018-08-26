import * as _ from 'lodash'

const titleCase = _.flow(
  _.camelCase,
  _.upperFirst,
) as (string?: string) => string

export default titleCase
