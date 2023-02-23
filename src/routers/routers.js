import { Route, BrowserRouter, Switch } from "react-router-dom"
import RouterAppElement from "./elements"
import routers from "./configs"
import Customers from "../pages/Customers"
const AppRouter=()=>{
    return (
          <Switch>
            {routers?.map((r) => (
              <Route
                path={r.path}
                exact={true}
              >
                <RouterAppElement
                    component={r.component}
                    path={r.path}
                    roles={r.roles}
                  />
              </Route>
            ))}
            {/* <Route path={"/customers"} component={Customers}/> */}
            {/* <Route path="*" element={<NotFoundPage/>}/> */}
            {/* <Route index element={<AppElement 
            component={HomePage}
                    isLayout={true}
                    layout={AuthenTemplate}
                    authen={true}
                    path={HOME_PAGE_PATH}
                    roles={[ROLE_ADMIN,ROLE_LOCATION_OWNER,ROLE_SERVICE_PROVIDER]} />} /> */}
          </Switch>
    )
}
export default AppRouter