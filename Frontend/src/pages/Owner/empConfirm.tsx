import React, { useEffect } from "react"
import Layout from "../../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import axios from "axios"
import { allUserData, editEmpStatusPayroll,editEmpStatusErp, logoutUser,getSingleEmp } from "../../services/apiFunction"
import SideBar from "../../components/OwnersSidebar"
import { Link } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {indianDate} from "../../services/utils"

function App() {
  const [records, setRecords] = useState<any>([])
  const [empToEdit, setEmpToEdit] = useState<any>()

  //To get All Employee
  const getAllEmployees = async () => {
    let data = await allUserData()
    setRecords(data.employeeData)
    console.log("1",data)
  }
  console.log(records);
  useEffect(() => {
    getAllEmployees()
    document.querySelectorAll("td,th").forEach(data => {
      data.classList.add("text-center")
    })
  }, [])

  //To edit probation period
  const onEditClick = async (e:any, empId:any, selectCount:number) => {
    //document.getElementById("select").disabled = false
    if (selectCount < 2) {
      const tableRow = e.target.closest("tr")
      const rowData = tableRow.querySelectorAll(".data")
      tableRow.querySelectorAll(".data").forEach((input:any) => {
        input.style.border = "1px solid black"
        input.style = "appearance: block"
      })
      tableRow.querySelector(".saveConfirmDate").style.display = ""
      const currentEmp = await getSingleEmp(empId)
      setEmpToEdit(currentEmp.data)
      console.log("h",currentEmp)
      rowData.forEach((element:any) => {
        element.removeAttribute("readOnly")
      })
    } else {
      toast.error("Sorry!! Can not edit")
    }
  }

  const onSaveClick = async (
    e:any,
    empId:any,
    count:number,
    joiningDate:Date,
    probationPeriod:string,
    name:string,
    lastName:string
  ) => {
   
    await editEmpStatusPayroll(empId,empToEdit.payrollData)
    e.target.style.display = "none"
    const tableRow = e.target.closest("tr")
    tableRow.querySelectorAll(".data").forEach((input:any) => {
      input.style.border = "none"
      input.style = "appearance: none"
    })
    
    toast.success(`Probation period of ${empId} is updated successfully`)
    if (count === 0) {
      editEmpStatusErp(empId, { selectCount: 1 })
    } else {
      editEmpStatusErp(empId, { selectCount: 2 })
    }

    if ((probationPeriod) == "3") {
      let confirmDate = new Date(joiningDate)
      confirmDate.setMonth(confirmDate.getMonth()+3)
      editEmpStatusErp(empId, { confirmationDate: confirmDate,probationPeriod:probationPeriod })
    } else if (probationPeriod == "6") {
      let confirmDate = new Date(joiningDate)
      confirmDate.setMonth(confirmDate.getMonth()+6)
      editEmpStatusErp(empId, { confirmationDate: confirmDate,probationPeriod:probationPeriod })
    } else if (probationPeriod == "9") {
      let confirmDate = new Date(joiningDate)
      confirmDate.setMonth(confirmDate.getMonth()+9)
      editEmpStatusErp(empId, { confirmationDate: confirmDate,probationPeriod:probationPeriod })
    }
    getAllEmployees()
  }

  const confirmBtnClick = async (id:any, name:string) => {
    editEmpStatusPayroll(id, { empStatus: "Confirmed" })
    getAllEmployees()
    toast.success(id + " confirmed successfully")
    getAllEmployees()
  }

  const notification = async (id:any) => {
    var notification = document.getElementById("notification") as HTMLElement
    notification.style.display = "block"
  }

  Array.from({ length: 1000 }, (_, i) => i + 1)

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-center">
              <div className="margin col-lg-11 col-md-9 col-sm-12 wrapper">
                <h2 className="text-center bulkText">
                  List of Employees to be Confirmed
                </h2>
                <h6 className="text-center mb-4">
                  <b>Note :</b> You can edit the probation period twice only.
                  Here Count column shows number of attempts used to edit the
                  probation period.
                </h6>
                <div className="empTable">
                  <table className="table-bordered mx-auto css-serial">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Count</th>
                        <th className="heading">Probation Period</th>
                        <th className="heading">Designation</th>
                        <th className="heading">Joining date</th>
                        <th className="heading">Confirmation date</th>
                        <th className="heading">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records &&
                        records.map((record:any, Index:number) => {
                          if (record.payrollData.empStatus === "Pending")
                            return (
                              
                              <tr key={Index}>
                                <td></td>
                                <td>
                                  {record.basic.name.firstName}{" "}
                                  {record.basic.name.MiddleName}{" "}
                                  {record.basic.name.lastName}
                                </td>
                                <td>{record.payrollData.empId}</td>
                                <td>{record.basic.selectCount}</td>
                                <td>
                                  <select
                                    style={{ appearance: "none" }}
                                    name="probationPeriod"
                                    className="data select"
                                    id="select"
                                    onChange={e => {
                                      setEmpToEdit({
                                        ...empToEdit,
                                        probationPeriod:Number(e.target.value),
                                      })
                                      record.basic.probationPeriod = e.target.value
                                    }}
                                    //disabled={true}
                                    defaultValue={record.basic.probationPeriod}
                                    arial-readOnly
                                  >
                                    {" "}
                                    <option value="3">3 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="9">9 Months</option>
                                  </select>
                                  <img
                                    src="/edit.png"
                                    alt="ViewImg"
                                    className={`editConfirmDate ${
                                      record.basic.selectCount === 2 ? "d-none" : ""
                                    }`}
                                    id="editBtn"
                                    onClick={e =>
                                      onEditClick(
                                        e,
                                        record.payrollData.empId,
                                        record.basic.selectCount
                                      )                                   
                                    }
                                  />
                                  <img
                                    src="/save.png"
                                    alt="ViewImg"
                                    className="saveConfirmDate editConfirmDate"
                                    style={{ display: "none" }}
                                    onClick={e =>
                                      onSaveClick(
                                        e,
                                        record.payrollData.empId,
                                        record.basic.selectCount,
                                        record.basic.dateOfJoining,
                                        record.basic.probationPeriod,
                                        record.basic.name.firstName,
                                        record.basic.name.lastName
                                      )
                                    }
                                  />
                                </td>
                                <td>{record.basic.designation}</td>
                                <td>{indianDate(record.basic.dateOfJoining)}</td>
                                <td>{indianDate( record.basic.confirmationDate)}</td>
                                <td>
                                  {" "}
                                  <button
                                    className="btn btn-success"
                                    id="btn"
                                    onClick={e =>
                                      confirmBtnClick(
                                        record.payrollData.empId,
                                        (record.basic.name.firstName,
                                        record.basic.name.lastName,
                                        record.payrollData.empStatus)
                                      )
                                    }
                                    disabled={
                                      new Date(
                                        record.basic.confirmationDate
                                      ).setHours(0, 0, 0, 0) >
                                      new Date().setHours(0, 0, 0, 0)
                                    }
                                  >
                                    Confirm
                                  </button>
                                </td>
                              </tr>
                              
                            )

                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default App
