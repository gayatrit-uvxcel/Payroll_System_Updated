import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../../../components/Layout"
import { getAllPfEmpData, allUserData } from "../../../services/apiFunction"
import { indianDate } from "../../../services/utils"

function PfExitedEmpList() {
  const [records, setRecords] = useState<any>([])

  const getAllPfEmpList = async () => {
    let combinedData = []

    let pfData = await getAllPfEmpData()
    const empPaymentData = pfData.empInfo
    // console.log(empPaymentData)

    let empData = await allUserData()
    const payrollUser = empData.employeeData

    let user = new Map()

    for (let i = 0; i < payrollUser.length; i++) {
      user.set(payrollUser[i].payrollData.empId, i)
    }
    // console.log(user)
    for (let i = 0; i < empPaymentData.length; i++) {
      if (user.has(empPaymentData[i].empId)) {
        combinedData.push({
          empPfData: empPaymentData[i],
          ...payrollUser[user.get(empPaymentData[i].empId)],
        })
      } else {
        combinedData.push({ ...empPaymentData[i] })
      }
    }
    setRecords(combinedData)
  }

  console.log(records)
  useEffect(() => {
    getAllPfEmpList()
  }, [])
  return (
    <Layout>
      <div className="container-fluid pfEnrolledListContainer">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Link to="/HR Management/pfManagement">
              {/* <img src="/arrow.png" alt="" className="arrowImg" /> */}
              <i className="bi bi-arrow-left-circle-fill"></i>
            </Link>
            <h2 className="text-center mb-4">List of Exited PF Employees </h2>

            <div className="empTable col-lg-12">
              <table className="table table-bordered css-serial">
                <thead>
                  <tr>
                    <th className="heading">Sr. No.</th>
                    <th className="heading">Name of Employee</th>
                    <th className="heading">
                      Date Of Birth (Mentioned on Aadhar card.)
                    </th>
                    <th className="heading">Employee Id</th>
                    <th className="heading">Aadhar Number</th>
                    <th className="heading">Pan Number</th>
                    <th className="heading">Bank Name</th>
                    <th className="heading">IFSC Code</th>
                    <th className="heading">Account number</th>
                    <th className="heading">Address</th>
                    <th className="heading">Date of registration</th>
                    <th className="heading">PF UAN Number</th>
                    <th className="heading">Joining Date</th>
                    <th className="heading">Last Working Day</th>
                    <th className="heading">Deletion Date and User EmpId</th>
                  </tr>
                </thead>
                <tbody>
                  {records && records.map((record:any, Index:number) => {
                    if (record.empPfData?.pfStatus === "Exited")
                    return (
                      <tr key={Index}>
                        <td></td>
                        <td>{record.empPfData.name}</td>
                        <td>{indianDate(record.empPfData.empDob)}</td>
                        <td>{record.empPfData.empId}</td>
                        <td>{record.empPfData.aadharNumber}</td>
                        <td>{record.empPfData.panNumber}</td>
                        <td>{record.empPfData.bankName}</td>
                        <td>{record.empPfData.ifscCode}</td>
                        <td>{record.empPfData.accountNumber}</td>
                        <td>{record.empPfData.address}</td>
                        <td>{record.empPfData.dateofRegistration}</td>
                        <td>{record.empPfData.pfUanNumber}</td>
                        <td>{indianDate(record.basic.dateOfJoining)}</td>
                        <td>{indianDate(record.empPfData?.lastWorkingDay)}</td>
                        <td>{`By ${
                          record.empPfData.updatedby?.empId
                        } on ${indianDate(
                          record.empPfData.updatedby?.date
                        )}`}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default PfExitedEmpList
