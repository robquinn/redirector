import * as Models from './models'
import * as Scalars from './scalars'
import Mutations from './mutations'

const resolvers = {
  ...Models,
  ...Scalars,
  // Query,
  Mutations,
  // Subscription,
}

export default resolvers
