import React from "react"
import { render as RCH } from "@testing-library/react"; // (RCH:- render component here)
import { createHistory,createMemorySource,LocationProvider } from "@reach/router";
import Layout from "../components/Layout"
import PrivateRoute from "../components/PrivateRout"
// import {rest} from "msw"
// import {setupServer} from "msw/node"

const user = {
    "success": true,
    "employee": {
        "basic": {
            "name": {
                "firstName": "Priya",
                "middleName": "Prajyot",
                "lastName": "Hatipkar"
            },
            "mobile": {
                "countryCode": "+91",
                "number": 9860288765
            },
            "employeeId": "UISPL0005",
            "gender": "Female",
            "dateOfJoining": "Tue Jan 03 2023 05:30:00 GMT+0530 (India Standard Time)",
            "maritalStatus": "MARRIED",
            "probationPeriod": 3,
            "confirmationDate": "2023-04-03T00:00:00.000Z",
            "dateOfBirth": "1989-10-17T00:00:00.000Z",
            "employmentStatus": "active",
            "employmentType": "FTE",
            "designation": "MARKETING MANAGER",
            "department": "MARKETING",
            "workMode": "WFH",
            "workLocation": "Pune",
            "selfDeclaration": {
                "idProofs": {
                    "bloodGroup": "B-Negative",
                    "aadhaarCard": {
                        "aadhaarNumber": 673465324222,
                        "verifyStatus": "Pending",
                        "uploadedAt": "2023-04-13T13:30:58.377Z"
                    },
                    "panCard": {
                        "panCardNumber": "AYRPP0904W",
                        "verifyStatus": "Pending",
                        "uploadedAt": "2023-04-13T13:30:58.377Z"
                    },
                    "passport": {
                        "verifyStatus": "Pending",
                        "uploadedAt": "2023-04-13T13:30:58.377Z"
                    }
                },
                "academics": [],
                "previousCompany": []
            },
            "email": "priyah@uvxcel.com",
            "selectCount": 0
        },
        "payrollData": {
            "updatedby": {
                "empId": "UISPL0005",
                "date": "2023-05-03T06:13:56.518Z"
            },
            "createdby": {
                "empId": "UISPL0001",
                "date": "2023-04-13T13:39:52.924Z"
            },
            "_id": "6438043c1ed10be60f9d953c",
            "empId": "UISPL0005",
            "__v": 0,
            "DOB": "1984-12-22",
            "DOB1": "2019-08-19",
            "NameofSpouse": "Prajyot Hatipkar",
            "child1": "Pravee Hatipkar",
            "child1Gender": "Female",
            "numberOfMember": 2,
            "relationship": "Husband",
            "role": "owner",
            "password": "$2a$10$pMVWSSG7LJcyLh5nwOGQvOv5HwfTLQ06mFX/g25JDvn2yZmnFVSQG",
            "empStatus": "Confirmed"
        }
    }
}

const render = (ui:any,{route="/"}={}) => {
    // beforeAll(()=>server.listen())
    // afterAll(()=>server.close)
    const history=createHistory(createMemorySource(route))
    window.history.pushState({},"",route)
    return RCH(
        <Layout>
    <LocationProvider history={history} >
       {ui}
    </LocationProvider>
    </Layout>
    )

}
// const protectedRender = (ui:any,{route="/"}={}) => {
//     const history=createHistory(createMemorySource(route))
//     window.history.pushState({},"",route)
//     return RCH(
//         <Layout>
//     <LocationProvider history={history} >
//         <PrivateRoute>

//         </PrivateRoute>
//        {ui}
//     </LocationProvider>
//     </Layout>
//     )

// }

export {render}