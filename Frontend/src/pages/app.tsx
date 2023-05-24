import React from "react"
import Layout from "../components/Layout"
import PrivateRoute from "../components/PrivateRout"
import Profile from "./HR Management/HrDashboard"
import Profile1 from "./Profile1"
import Login from "../components/Login"
import SuperAdmin from "./superAdmin/SuperAdmin"
import Owner from "./Owner/Owner"
import Myprofile from "./Owner/myprofile"
import { Router } from "@reach/router"



const App = () => {
    return (
        <>
            <Layout>
                <Router>

                    <PrivateRoute
                        isValidRole={["hrAdmin"]}
                        path="/app/hrdashboard"
                        component={Profile}
                    />
                    <PrivateRoute
                        isValidRole={["superAdmin"]}
                        path="/app/superadmin"
                        component={SuperAdmin} />
                    <PrivateRoute
                        isValidRole={["owner"]}
                        path="/app/owner"
                        component={Owner} />
                    <PrivateRoute
                        isValidRole={["technicalEmployee", "accountEmployee", "marketingEmployee"]}
                        path="/app/profile1"
                        component={Profile1} />
                    <PrivateRoute
                        isValidRole={["owner"]}
                        path="/myProfile"
                        component={Myprofile} />
                    <Login path="/app/login" />
                    {/* <Owner path="app/own" /> */}
                </Router>
            </Layout>
        </>
    )
}
export default App
