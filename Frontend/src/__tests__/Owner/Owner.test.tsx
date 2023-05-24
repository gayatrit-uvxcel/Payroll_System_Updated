import React from "react";
import { render as RCH } from "@testing-library/react"; // (RCH:- render component here)
import { createHistory,createMemorySource,LocationProvider } from "@reach/router";
import { Router} from "@reach/router";
import Owner from "../../pages/Owner/Owner";
import Layout from "../../components/Layout";
import userEvent from "@testing-library/user-event"

const render = (ui:any,{route="/app/owner"}={}) => {
    const history=createHistory(createMemorySource(route))
    window.history.pushState({},"",route)
    return RCH(<LocationProvider history={history} >
       {ui}
    </LocationProvider>)

}

describe("testing Owner.tsx",()=>{
    it("checking is All Employee Like is working",()=>{
        const history = createHistory(createMemorySource("/"))
        window.history.pushState({},"","/app/owner")

        RCH(<LocationProvider history={history} >
            <Router>
            {/* <Owner path="/app/owner" /> */}
        </Router>
        </LocationProvider>)

        // RCH()
     const {debug,getByText,getByTestId} = render(<Owner/>)
     console.log(window.location.href)
     const link1 = getByTestId("/Owner/listOfEmp")
    //  console.log(link1.)
    userEvent.click(link1)
    window.history.pushState({},"","/Owner/listOfEmp")
        // debug()
    })

})