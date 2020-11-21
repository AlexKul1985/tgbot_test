import rc from 'rc'
import { ConfigT } from '../types/config.type'
export function getConfig( name: string ): ConfigT {
    const config = rc(name)
    if( !config ) {
        throw new Error(`Config by name ${name} not found!`)
    }
    return <ConfigT>config
}