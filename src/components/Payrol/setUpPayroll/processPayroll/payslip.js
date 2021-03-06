import React, { Component } from 'react'
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import PayrollModal from '../../../Modals/addPayrollItem2'
import Layout from "../../../layout/index";
import Goback from '../../goBack/index'
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../../../actions/data.action";
import { hideLoader, showLoader } from "../../../../helpers/loader";
import './index.css'
import ProcessPayrollTable from './processPayrollTable'
import _ from 'lodash'
export default class processPayroll extends Component {
    constructor(props){
        super(props)
   this.state={
      payrollItems:[],
      amount:"",
      name:"",
      processPayrollData:[],
      payrollOption:[],
      processPayroll: []
   }
   console.log(">>>",this.props)
    }

    componentDidMount(){
      showLoader()
      this.getPayrollID()
      this.getPayrollProcess()
      
    
   }

   handleChange  =  (e) => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
   console.log(this.state)
     }
    
    getPayrollID = async ()=>{
	
	
		try{
		
			const res = await httpGet(`/payroll_items`)
	  console.log(res)
			if(res.code === 200){
				this.setState({
					payrollItems:res.data.payrollItems
				})
				hideLoader();
	
				
			}
	  
		  }catch(error){
			hideLoader();
			console.log(error);
		  }
		
     }
     
   
	  handleSubmit= async ()=>{
		const SalaryStructure = {name:this.state.name};
		if (this.state.amount === "" || this.state.name === "invalidData" || this.state.name === null ) {
		  NotificationManager.error(
			  "Opps Insert Data",
				  "Oops!",
				  4000
			  );
  
			  
		}
  
		else{
				  
	  
		try{
		  
		  showLoader()
		  let data ={
			payrollItemId:this.state.name,
			processPayrollUserId:this.props.match.params.id2,
			amount: this.state.amount,
        }
       
		 const res = await httpPost(`add_payroll_item_user`,data)
	   console.log(data)
		  if(res.code === 200){
		  this.setState({name:""})
		  $('.modal').modal('hide');
          $(document.body).removeClass('modal-open');
          $('.modal-backdrop').remove();
					hideLoader();
					NotificationManager.success(
					  "A Salary Structure item has successfully been created",
						  "Success!",
						  5000
					  );
					 
		  }
	
		}catch(error){
		  hideLoader();
		  console.log(error);
		}}
      }
      
     getPayrollProcess=async()=>{
        try {
            const { id } = this.props.match.params
            const res = await httpGet(`processing_payroll_users/${this.props.match.params.id}`)
            const data = await httpGet(`process_payroll/${id}`)
            if (res.code === 200) {
                hideLoader()
                this.setState({
                    processPayrollData:res.data.processPayrollUsers,
                    processPayroll: data.data.processPayroll
                })
                this.getUserPayrollItem()
            }
         
        } catch (error) {
         hideLoader()
        }
    }

    getUserPayrollItem=()=>{
      console.log(this.state.processPayrollData,"gets hrere>>>>>")
       this.state.processPayrollData.filter((data)=>{
         //  this.setState({payrollOption:data!==this.props.match.params.staffId})
         if (data.staffId !== this.props.match.params.staffId) {
            console.log("true>>>>>>>")
         }
         else{
            console.log("false>>>>>>>>")
            this.setState({payrollOption:data.payrollProcessingItem})
            console.log(this.state.payrollOption)
         }
        
       })

    }

    getReduction = (payroll, type) => {
      let BHT = 0;
      payroll.map(item => {
        if(item.payroll.name === 'Basic Pay' || item.payroll.name === 'Transportation Allowance' || item.payroll.name === 'Housing Allowance' || item.payroll.name === 'Kidnapping'){
          BHT = BHT + parseInt(item.amount)
        }
      })
    
      let grossPay = 0;
      payroll.map(item => (
        grossPay = grossPay + parseInt(item.amount)
      ))
    
      const annualGross = grossPay * 12;
      const CR = ((20/100) * annualGross) + 200000;
      // const PR = (8/100) * BHT;
      const PR = 13520;
      const TR = CR + PR;
      const taxableIncome = annualGross - TR;
    
      if(type === 'netpay'){
        return grossPay - this.getTax(taxableIncome)
      } else {
        return this.getTax(taxableIncome)
      }	
    }
    
    getTax = (taxableIncome) => {
      let newValue = taxableIncome;
      let sumArr = [];
      let checkList = [
        {x: 300000, y: 0.07}, 
        {x: 300000, y: 0.11}, 
        {x: 500000, y: 0.15}, 
        {x: 500000, y: 0.19}, 
        {x: 1600000, y: 0.21}, 
        {x: 3200000, y: 0.24}, 
      ];
      for(let i = 0; i < checkList.length; i++){
        if(newValue > checkList[i].x){
          sumArr.push(checkList[i].y * checkList[i].x)
          newValue = newValue - checkList[i].x
        } else if(newValue < checkList[i].x){
          sumArr.push(checkList[i].y * newValue)
          break;
        }
      }
      console.log(sumArr)
      const annualTax = sumArr.reduce((a, b) => a + b, 0)
      const monthlyTax = annualTax / 12;
      return (monthlyTax).toFixed(2)
    }
  

    
	sumUp=(value)=>{
		console.log(">>>>>")
		let sum = 0;
		for (let i = 0; i < value.length; i++) {
         sum = sum + parseInt(value[i].amount);
         
         }
		// console.log([sum].reduce((a, b) => a + b, 0))
		return(sum)
   }

   		getTotalReduction = (payroll) => {
			let totalList = [];
			payroll.map((data, index) => {
				const total = this.getReduction(data.payrollProcessingItem)
				totalList.push(parseInt(total))
			})
			// console.log(totalList)
			const total = [...totalList].reduce((a, b) => a + b, 0)
			return total || 0
		}

   sumUpReduction=(value)=>{
		let sum = 0;
		for (let i = 0; i < value.length; i++) {
         if(!value.payroll.positive){
            sum = sum + parseInt(value[i].amount);
         } else {

         }
         }
		// console.log([sum].reduce((a, b) => a + b, 0))
		return(sum)
   }
         
         
    render() {
      const { processPayroll, payrollOption } = this.state;
      const payroll = payrollOption.filter(item => item.payroll.positive)
      const negativePayroll = payrollOption.filter(item => !item.payroll.positive)
      const { branchId, areaId, regionId } = processPayroll;
      let regionName, areaName, branchName;
      if(branchId){
          regionName = processPayroll.branch !== undefined ? processPayroll.branch.region.name : '';
          areaName = processPayroll.branch !== undefined ? processPayroll.branch.area.name : '';
          branchName = `${processPayroll.branch.name} branch`;
      }
      if(areaId){
          regionName = processPayroll.area !== undefined ? processPayroll.area.region.name : '';
          areaName = processPayroll.area !== undefined ? processPayroll.area.name : '';
          branchName = '';
      }
      if(regionId){
          regionName = processPayroll.region !== undefined ? processPayroll.region.name : '';
          areaName = '';
          branchName = '';
      }
      const month = processPayroll.month !== undefined ? processPayroll.month.toUpperCase() : '';
      //   let sumUpAmount = this.state.payrollOption.map((data)=>{
      //      let sumUp = parseInt(data.amount)
      //      _.sum(sumUp)
      //      console.log(sumUp)
      //       this.setState({totalPayrollAmount:sumUp})
      //     return (sumUp)
        
      //   })
      //   console.log(sumUpAmount)
        return (
            <div>
                <Layout page="payrollSetup">
				<div className="app-content">
					<section className="section">
					<Goback goback={this.props.history.goBack}/>
					</section>

                    <div id="appWrapResponsive">
	<section className="PayrollLocationInfo">
                  <h1>Payroll for {regionName} region, {areaName}</h1>
                  <h2>Period: {month + ' ' + (processPayroll.year || '')} </h2>
                  <h3>{branchName}</h3>
                
                    </section>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPayroll2" className="addPayrollBtn">Add Payroll Item</button>
 <h1 style={{marginLeft: "20px",
    fontSize: "20px",
    marginBottom: "-7px"}}>Payslip Details</h1>
<div className="flexPayslip">




<div className="userpayslipWrap">

    <div className="payslipheader">
   <span className="headerinfo">
   Earnings for the month
   </span>

   <span className="headerinforesult">
   Amount
   </span>
   {console.log(this.state.payrollOption)}
    </div>

  {
    [...payroll].map((data)=>{
      return( 
        
             <div className="Userpayslip">
       <span className="Userpayslipeven">{data.payroll.name}</span>
       <span className="UserpayslipOdd">{data.amount}</span>
          </div> 

        )
     })
  
  }


 
<div className="addRelative">
     <div className="payslipheader stickAmout">
   <span className="headerinfo">
   Total
   </span>

   <span className="headerinforesult">
      {this.sumUp(payroll)}
   </span>
    </div>
</div>


</div>




<div className="userpayslipWrap">

    <div className="payslipheader">
   <span className="headerinfo">
   Allowances for the month
   </span>

   <span className="headerinforesult">
   Amount
   </span>
    </div>

   {/* <div className="Userpayslip">
       <span className="Userpayslipeven">Meal</span>
         <span className="UserpayslipOdd">20000</span>
      </div>  */}



<div className="addRelative">
     <div className="payslipheader stickAmout">
   <span className="headerinfo">
   Total
   </span>

   <span className="headerinforesult">
  0
   </span>
    </div>
</div>
     


</div>





<div className="userpayslipWrap">

    <div className="payslipheader">
   <span className="headerinfo">
   Deduction for the month
   </span>

   <span className="headerinforesult">
   Amount
   </span>
    </div>

   {
      negativePayroll.map(item => (
         <div className="Userpayslip">
            <span className="Userpayslipeven">{item.payroll.name}</span>
            <span className="UserpayslipOdd">{item.amount}</span>
          </div> 
      ))  
   }


 
<div className="addRelative">
     <div className="payslipheader stickAmout">
   <span className="headerinfo">
   Total
   </span>

   <span className="headerinforesult">
      {this.sumUpReduction(negativePayroll)}
   </span>
    </div>
</div>


</div>


</div>
    







          </div>


                    </div>
                    <PayrollModal
                    payrollData={this.state.payrollItems}
                    handleChange={this.handleChange} 
                    name={this.state.name}
                    handleSubmit={this.handleSubmit}
                    />
				
                    </Layout>
            </div>
        )
    }
}
