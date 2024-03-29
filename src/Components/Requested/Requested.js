import React, { useEffect, useState } from "react";
import "./requests.css";
import { useForm } from "react-hooks-helper";
import Table from 'react-bootstrap/Table'
import contract from "../../build/contracts/Taxation.json";
import { ethers } from "ethers";
const BigNumber = require('bignumber.js');

function Requested() {
  const [status, setStatus] = useState("");
  const [owner, setOwner] = useState("");


  async function getRequestDetails() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);

    console.log(accounts[0]);

    const deployedNetwork = contract.networks[5777];
    const taxContract = new ethers.Contract(deployedNetwork.address, contract.abi, provider);

    // let array = [2];
    const lengthls = await taxContract._filersIds();
    let arrlength = new BigNumber(lengthls._hex).s;
    console.log("length", new BigNumber(lengthls._hex).s);

    const taxDetail = await taxContract.getFiler(accounts[0]);
    console.log("Tax Owner", taxDetail[0]);
    setOwner(taxDetail[0].toString())

    const taxRemDetail = await taxContract.getFilerRemainingData(accounts[0]);
    console.log("Tax Status", taxRemDetail[6]);
    setStatus(taxRemDetail[6].toString())
  }

  useEffect(() => {
    getRequestDetails()
  }, [])

  return (
    <div className="container">
      <div className="row d-flex justify-content-center py-5">
        <div className="col-md-3 tax">
          <h1>Request Status</h1>
        </div>
      </div>
      <div className="row tax d-flex justify-content-center">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Owner</th>
              <th>Is Verified</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{owner}</td>
              <td style={status == true ? { color: 'green' } : { color: 'red' }}>{status}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div >
  );
}

export default Requested;
