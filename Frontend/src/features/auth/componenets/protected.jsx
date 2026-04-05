import {useAuth} from '../hooks/use.auth'
import { Navigate } from 'react-router'
import Loader from '../../../components/Loader/Loader'

const Protected = ({children}) =>{
    const {loading,user} = useAuth()

    if(loading){
        return <Loader text="Authenticating..." />
    }
  

if(!user){
    return <Navigate to="/login" />
}

return children

}

export default Protected