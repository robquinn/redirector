import { asNexusMethod } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'

const DateTime = asNexusMethod(DateTimeResolver, 'datetime')

export default DateTime
