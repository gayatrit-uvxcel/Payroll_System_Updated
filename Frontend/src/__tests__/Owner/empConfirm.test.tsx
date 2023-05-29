import React from "react"
import { render } from "../../test_Util/testing_repeat_code";
import {rest} from "msw"
import {setupServer} from "msw/node";
import EmpConfirm from "../../pages/Owner/empConfirm"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"
import { getByTestId, waitFor } from "@testing-library/dom";




const data = {
    "success": true,
    "employeeData": [
        {
            "basic": {
                "name": {
                    "firstName": "Prapti",
                    "middleName": "Anil",
                    "lastName": "Gomekar"
                },
                "mobile": {
                    "countryCode": "+91",
                    "number": 9860234523
                },
                "selectCount": 0,
                "employeeId": "UISPL0004",
                "gender": "Female",
                "dateOfJoining": "Sun Feb 13 2022 05:30:00 GMT+0530 (India Standard Time)",
                "maritalStatus": "SINGLE",
                "probationPeriod": 3,
                "confirmationDate": "2022-05-12T18:30:00.000Z",
                "dateOfBirth": "2000-11-18T00:00:00.000Z",
                "employmentStatus": "active",
                "employmentType": "FTE",
                "designation": "JUNIOR SOFTWARE ENGINEER",
                "department": "SOFTWARE DEVELOPMENT",
                "workMode": "WFH",
                "workLocation": "Pune",
                "selfDeclaration": {
                    "idProofs": {
                        "bloodGroup": "B-Positive",
                        "aadhaarCard": {
                            "aadhaarNumber": 673465324246,
                            "verifyStatus": "Pending",
                            "uploadedAt": "2023-04-13T13:30:19.872Z"
                        },
                        "panCard": {
                            "panCardNumber": "AYRPP0909Q",
                            "verifyStatus": "Pending",
                            "uploadedAt": "2023-04-13T13:30:19.872Z"
                        },
                        "passport": {
                            "verifyStatus": "Pending",
                            "uploadedAt": "2023-04-13T13:30:19.872Z"
                        }
                    },
                    "academics": [],
                    "previousCompany": []
                },
                "email": "praptig@uvxcel.com"
            },
            "payrollData": {
                "updatedby": {
                    "empId": "UISPL0005",
                    "date": "2023-04-13T14:23:06.648Z"
                },
                "createdby": {
                    "empId": "UISPL0001",
                    "date": "2023-04-13T13:49:48.759Z"
                },
                "_id": "6438042c1ed10be60f9d952a",
                "empId": "UISPL0004",
                "__v": 0,
                "DOB3": "1966-06-06",
                "DOB4": "1970-07-08",
                "NameofFather": "Anil Gomekar",
                "NameofMother": "Savita Gomekar",
                "numberOfMember": 2,
                "role": "technicalEmployee",
                "empStatus": "Confirmed"
            }
        },
        {
            "basic": {
                "name": {
                    "firstName": "Pratik ",
                    "middleName": "Dilip",
                    "lastName": "Raut"
                },
                "mobile": {
                    "countryCode": "+91",
                    "number": 9867456786
                },
                "selectCount": 0,
                "employeeId": "UISPL0006",
                "gender": "Male",
                "dateOfJoining": "Thu Apr 13 2023 05:30:00 GMT+0530 (India Standard Time)",
                "maritalStatus": "SINGLE",
                "probationPeriod": 3,
                "confirmationDate": "2023-05-12T18:30:00.000Z",
                "dateOfBirth": "1998-12-28T00:00:00.000Z",
                "employmentStatus": "active",
                "employmentType": "FTE",
                "designation": "JUNIOR ACCOUNTANT ",
                "department": "ACCOUNT",
                "workMode": "WFH",
                "workLocation": "Pune",
                "selfDeclaration": {
                    "idProofs": {
                        "bloodGroup": "B-Positive",
                        "aadhaarCard": {
                            "aadhaarNumber": 234356787898,
                            "verifyStatus": "Pending",
                            "uploadedAt": "2023-04-14T09:15:59.565Z"
                        },
                        "panCard": {
                            "panCardNumber": "AYRPT5567Y",
                            "verifyStatus": "Pending",
                            "uploadedAt": "2023-04-14T09:15:59.565Z"
                        },
                        "passport": {
                            "verifyStatus": "Pending",
                            "uploadedAt": "2023-04-14T09:15:59.565Z"
                        }
                    },
                    "academics": [],
                    "previousCompany": []
                },
                "email": "pratikr@uvxcel.com"
            },
            "payrollData": {
                "empStatus": "Pending",
                "_id": "643919e12a78b7517d0510db",
                "empId": "UISPL0006",
                "DOB3": "1968-12-09",
                "DOB4": "1970-03-08",
                "NameofFather": "Dilip Raut",
                "NameofMother": "ABC",
                "numberOfMember": 3,
                "role": "technicalEmployee"
            }
        }
    ]
}


const server = setupServer()


const customeServerCall = () => {
    return server.use(rest.get("/api/v2/payroll/user/all",(req,res,ctx)=>{
        return res(ctx.json(data))
    }))
}

describe("empConfirm.test.tsx",()=>{
    
    beforeAll(()=>server.listen())
    afterEach(()=>server.resetHandlers())
    afterAll(()=>server.close())
    it("component should render", async ()=>{
        customeServerCall()
        const {getByText,debug,findByText} = render(<EmpConfirm/>,{route:"/Owner/empConfirm/"})

        await findByText("UISPL0006")
    })

    it("scenario:When click on the edit but edit Then need to be enable the select input to edit the option and after that clicking on save button to save the changes", async ()=>{
        customeServerCall()
        // for one employee call
        server.use(rest.get("/api/v2/single-emp/UISPL0006",(req,res,ctx)=>{
            res(ctx.json(  {
                "basic": {
                    "name": {
                        "firstName": "Pratik ",
                        "middleName": "Dilip",
                        "lastName": "Raut"
                    },
                    "mobile": {
                        "countryCode": "+91",
                        "number": 9867456786
                    },
                    "selectCount": 0,
                    "employeeId": "UISPL0006",
                    "gender": "Male",
                    "dateOfJoining": "Thu Apr 13 2023 05:30:00 GMT+0530 (India Standard Time)",
                    "maritalStatus": "SINGLE",
                    "probationPeriod": 3,
                    "confirmationDate": "2023-07-12T18:30:00.000Z",
                    "dateOfBirth": "1998-12-28T00:00:00.000Z",
                    "employmentStatus": "active",
                    "employmentType": "FTE",
                    "designation": "JUNIOR ACCOUNTANT ",
                    "department": "ACCOUNT",
                    "workMode": "WFH",
                    "workLocation": "Pune",
                    "selfDeclaration": {
                        "idProofs": {
                            "bloodGroup": "B-Positive",
                            "aadhaarCard": {
                                "aadhaarNumber": 234356787898,
                                "verifyStatus": "Pending",
                                "uploadedAt": "2023-04-14T09:15:59.565Z"
                            },
                            "panCard": {
                                "panCardNumber": "AYRPT5567Y",
                                "verifyStatus": "Pending",
                                "uploadedAt": "2023-04-14T09:15:59.565Z"
                            },
                            "passport": {
                                "verifyStatus": "Pending",
                                "uploadedAt": "2023-04-14T09:15:59.565Z"
                            }
                        },
                        "academics": [],
                        "previousCompany": []
                    },
                    "email": "pratikr@uvxcel.com"
                },
                "payrollData": {
                    "empStatus": "Pending",
                    "_id": "643919e12a78b7517d0510db",
                    "empId": "UISPL0006",
                    "DOB3": "1968-12-09",
                    "DOB4": "1970-03-08",
                    "NameofFather": "Dilip Raut",
                    "NameofMother": "ABC",
                    "numberOfMember": 3,
                    "role": "technicalEmployee"
                }
            }))
        }))

      
        const {debug,findByText,getAllByTestId,container} = render(<EmpConfirm/>,{route:"/Owner/empConfirm/"})

        await findByText("UISPL0006")

        const editBtns = container.querySelectorAll("#editBtn")
        expect(editBtns.length).toBeGreaterThanOrEqual(1)

       // waiting because it calling async function
        await waitFor(()=> userEvent.click(editBtns[0])) 

        expect(getAllByTestId("saveBtn")[0]).not.toHaveStyle('display:none')

        const selectRef = getAllByTestId("probitionPeriod")[0] as HTMLSelectElement
    
        await waitFor(()=> userEvent.selectOptions(selectRef,"6")) 

        expect(selectRef.value).toBe('6');

        const saveBtns = container.querySelectorAll("#saveBtn")
        // console.log(saveBtns.length)
        expect(editBtns.length).toBeGreaterThanOrEqual(1)

         // waiting because it calling async function
         await waitFor(()=> userEvent.click(saveBtns[0]))

        server.use(rest.put("/api/v2/edit-emp/payroll/UISPL0006",(req,res,ctx)=>{
            data.employeeData[0].basic.probationPeriod = 6

           res(ctx.status(200),ctx.json({success:true}))
        }))  
         server.use(rest.put("/api/v2/edit-emp/erp/UISPL0006",(req,res,ctx)=>{
            data.employeeData[0].basic.selectCount = 1

           res(ctx.status(200),ctx.json({success:true}))
        })) 

        // debug()
    })


    it("when confirm button is enable than click on confirm to confirm the employee", async ()=>{
        customeServerCall()

        const {debug,findByText,getAllByTestId,container} = render(<EmpConfirm/>,{route:"/Owner/empConfirm/"})

        await findByText("UISPL0006")

        // debug()

        const confirmBtns = getAllByTestId("confirmBtn")
        expect(confirmBtns.length).toBeGreaterThanOrEqual(1)

        expect(confirmBtns[0]).not.toHaveAttribute("disabled")

        await waitFor(()=>userEvent.click(confirmBtns[0]))

        server.use(rest.put("/api/v2/edit-emp/payroll/UISPL0006",(req,res,ctx)=>{
            data.employeeData[0].payrollData.empStatus = "confirm"

           res(ctx.status(200),ctx.json({success:true}))
        })) 

        // customeServerCall()

        // debug()



        // console.log(confirmBtns.map((btn=>btn.innerHTML)))



    })
})