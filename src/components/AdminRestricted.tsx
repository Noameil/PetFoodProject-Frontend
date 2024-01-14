import { FunctionComponent, useContext } from "react";
import AuthContext, { isAdmin } from "../contexts/AuthContext";



export default function AdminRestricted(Component : FunctionComponent) {

    return function useAdminRestricted() {
        //TO ACCESS USER - ACCESS CONTEXT
        const {user} = useContext(AuthContext)
        if(user != undefined) {
            if(isAdmin(user))
            return <Component/>
        }
        return null
    }
  
}