import React, { Component } from 'react';
import Moment from 'react-moment';
import $ from 'jquery';
import Layout from '../layout/index';
import { httpPost, httpPatch, httpDelete } from '../../actions/data.action';
import { hideLoader, showLoader } from '../../helpers/loader';
import { NotificationManager } from 'react-notifications';
import { validateGuarantorFields } from '../../helpers/validations';
import { slga, getLga } from '../../helpers/states';
import GuarantorTable from './GuarantorTable';
import { GuarantorModal } from '../Modals/Guarantor'

class Guarantor extends Component {
	constructor(props){
		super(props)
		this.state = {
			postData: {
				firstName: '',
				lastName: '',
				middleName: '',
				mobilePhone: '',
				homePhone: '',
				businessPhone: '',
				mobilePhoneCode: '',
				homePhoneCode: '',
				businessPhoneCode: '',
				relationship: '',
				occupation: '',
				residentialAddress: '',
				residentialCountry: '',
				residentialState: '',
				residentialLga: '',
				residentialCity: '',
				landedPropertyAddress: '',
				landedPropertyCountry: '',
				landedPropertyState: '',
				landedPropertyLga: '',
				landedPropertyCity: '',
				businessAddress: '',
				businessCountry: '',
				businessState: '',
				businessLga: '',
				businessCity: '',
				maritalStatus: '',
				employeeKnownDate: '',
				criminalHistory: ''
			},
			moreData: [],
			pageMode: 'create',
			errorMessage1: null,
			errorMessage2: null,
			errorMessage3: null,
			errorMessage4: null,
			errorMessage5: null,
			errorMessage6: null,
			errorMessage7: null
		}
	}

	handleChange = async (e, nameValue) => {
		const { postData } = this.state;
		let details = e !== null ? e.target : '';

		if(nameValue === 'employeeKnownDate'){
			postData[nameValue] = e;
			this.setState({ postData });
			const isValidate = validateGuarantorFields(nameValue, this.state.postData.employeeKnownDate);
      if(!isValidate.error){
        this.setState({ 
          errorMessage7: isValidate.errorMessage, 
        })
        return;
      } else {
				console.log('here')
				this.setState({ errorMessage7: null  })
			}

		} else if(details.name === 'criminalHistory'){
			let value;
			if(details.value === "true"){
				value = true;
			} else {
				value = false;
			}
			postData[e.target.name] = value;
			this.setState({ postData });
		} else if(details.name === 'firstName'){
			postData[details.name] = details.value;
      this.setState({ 
        postData
      })
			const isValidate = await validateGuarantorFields(details.name, this.state.postData.firstName);
      if(!isValidate.error){
        this.setState({ 
          errorMessage1: isValidate.errorMessage, 
        })
        return;
      } else {
				this.setState({ errorMessage1: null  })
			}
    } else if(details.name === 'lastName'){
			postData[details.name] = details.value;
      this.setState({ 
        postData 
      })
      const isValidate = await validateGuarantorFields(e.target.name, this.state.postData.lastName);
      if(!isValidate.error){
        this.setState({ 
          errorMessage2: isValidate.errorMessage, 
        })
        return;
      } else {
				this.setState({errorMessage2: null});
			}
    } else if(details.name === 'middleName'){
			postData[details.name] = details.value;
      this.setState({ 
        postData 
      })
      const isValidate = await validateGuarantorFields(e.target.name, this.state.postData.middleName);
      if(!isValidate.error){
        this.setState({ 
					errorMessage3: isValidate.errorMessage,
        })
        return;
      } else {
				this.setState({errorMessage3: null })
			}
    } else if(details.name === 'mobilePhone'){
			postData[details.name] = details.value;
      this.setState({ 
        postData 
      })
      const isValidate = await validateGuarantorFields(e.target.name, this.state.postData.mobilePhone);
      if(!isValidate.error){
        this.setState({ 
					errorMessage4: isValidate.errorMessage,
        })
        return;
      } else {
				this.setState({errorMessage4: null})
			}
    } else if(details.name === 'homePhone'){
			postData[details.name] = details.value;
      this.setState({ 
        postData
      })
      const isValidate = await validateGuarantorFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage5: isValidate.errorMessage, 
        })
        return;
      } else {
				this.setState({errorMessage5: null })
			}
    } else if(details.name === 'businessPhone'){
			postData[details.name] = details.value;
      this.setState({ 
        postData
      })
      const isValidate = await validateGuarantorFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage6: isValidate.errorMessage, 
        })
        return;
      } else {
				this.setState({errorMessage6: null})
			}
    } else {
			postData[details.name] = details.value;
			this.setState({ postData });
		}
	}

	handleCustomSelect = (result, name) => {
		const { postData } = this.state;
		const value = result !== null ? result.value : ''
		console.log(name, value)
		// if(name === 'mobilePhoneCode'){
		// 	postData[name] = value;
		// 	this.setState({ 
		// 		postData,
		// 	});
		// 	this.setState(state => {
    //     return {
		// 			...state,
    //       selected1: value
    //     };
    //   });
		// } else if(name === 'homePhoneCode'){
		// 	postData[name] = value;
		// 	this.setState({ 
		// 		postData,
		// 	});
		// 	this.setState(state => {
    //     return {
		// 			...state,
    //       selected2: value
    //     };
    //   });
		// } else if(name === 'businessPhoneCode'){
		// 	postData[name] = value;
		// 	this.setState({ 
		// 		postData
		// 	});
		// 	this.setState(state => {
    //     return {
		// 			...state,
    //       selected3: value
    //     };
    //   });
		// } else if(name === 'relationship'){
		// 	postData[name] = value;
		// 	this.setState({ 
		// 		postData
		// 	});
		// 	this.setState(state => {
    //     return {
		// 			...state,
    //       selected4: value
    //     };
    //   });
		// } else if(name === 'occupation'){
		// 	postData[name] = value;
		// 	this.setState({ 
		// 		postData
		// 	});
		// 	this.setState(state => {
    //     return {
		// 			...state,
    //       selected5: value
    //     };
    //   });
		// }
  
		postData[name] = value;
		this.setState({ 
			postData
		});
  }

	addMore = () => {
		const { 
			firstName,
			lastName,
			middleName,
			mobilePhone,
			homePhone,
			businessPhone,
			relationship,
			occupation,
			residentialAddress,
			landedPropertyAddress,
			businessAddress,
			maritalStatus,
			employeeKnownDate,
			criminalHistory
		} = this.state.postData;

		console.log(this.state.postData)

		if(firstName === '' || firstName === undefined || lastName === '' || lastName === undefined || middleName === '' || middleName === undefined || mobilePhone === '' || mobilePhone === undefined || businessPhone === '' || businessPhone === undefined || relationship === '' || relationship === undefined || homePhone === '' || homePhone === undefined || occupation === '' || occupation === undefined || residentialAddress === '' || residentialAddress === undefined || landedPropertyAddress === '' || landedPropertyAddress === undefined || businessAddress === '' || businessAddress === undefined || maritalStatus === '' || maritalStatus === undefined || employeeKnownDate === '' ||  employeeKnownDate === undefined || criminalHistory === '' ||criminalHistory === undefined){
			return NotificationManager.warning('All fields are required');
		}

		this.setState({ 
			moreData: [...this.state.moreData, this.state.postData], 
		});
		
		this.setState({ 
			postData: {
				firstName: '',
				lastName: '',
				middleName: '',
				mobilePhone: '',
				homePhone: '',
				businessPhone: '',
				mobilePhoneCode: '',
				homePhoneCode: '',
				businessPhoneCode: '',
				relationship: '',
				occupation: '',
				residentialAddress: '',
				residentialCountry: '',
				residentialState: '',
				residentialLga: '',
				residentialCity: '',
				landedPropertyAddress: '',
				landedPropertyCountry: '',
				landedPropertyState: '',
				landedPropertyLga: '',
				landedPropertyCity: '',
				businessAddress: '',
				businessCountry: '',
				businessState: '',
				businessLga: '',
				businessCity: '',
				maritalStatus: '',
				employeeKnownDate: '',
				criminalHistory: '',
			}
		});
		$('.modal').modal('hide');
    $(document.body).removeClass('modal-open');
		$('.modal-backdrop').remove();
	}

	removeMore = (value, id) => {
		if(this.state.pageMode === 'create'){
			this.setState({
				moreData: this.state.moreData.filter((interest,index) => index !== parseInt(value))
			}); 
		} else {
			this.handleDelete(id, value)
		}
	}
	
	handleDelete = async (id, indexValue) => {
		try{
			const res = await httpDelete(`auth/delete_guarantor/${id}`);
			if(res.code === 200){
				this.setState({
					moreData: this.state.moreData.filter((interest,index) => index !== parseInt(indexValue))
				})
			}
		}catch(error){
			console.log(error)
		}
	}

	handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(this.state.postData);
    try{
			const { id } = this.props.match.params;

			if(this.state.moreData.length < 3){
				return NotificationManager.warning('A minimum of 3 guarantor is required')
			}

			if(this.state.pageMode === 'edit'){
				showLoader();
				const res = await httpPatch(`auth/edit_onboarding_four/${id}`, this.state.moreData);
				if(res.code === 201){
					hideLoader();
					this.setState({ moreData: res.data.guarantor });

					return this.props.history.push({
						pathname: `/create_staff/five/${res.data.id}`,
						backurl: `/create_staff/four/${res.data.id}`,
						savedState: this.state.moreData,
						direction: 'forward'
					});
				}
			} else {
				showLoader();
				const res = await httpPost(`auth/onboarding_four/${id}`, this.state.moreData);
				if(res.code === 201){
					hideLoader();
					this.setState({ moreData: res.data.guarantor });
					// return this.props.history.push(`/create_staff/five/${res.data.id}`)
					return this.props.history.push({
						pathname: `/create_staff/five/${res.data.id}`,
						backurl: `/create_staff/four/${res.data.id}`,
						savedState: this.state.moreData,
						direction: 'forward'
					});
				}
			}
      
    } catch (error){
			hideLoader()
      console.log(error)
    }
	}

	handleSave = async (e) => {
		e.preventDefault()
    try{
			const { id } = this.props.match.params;
			showLoader();
      const res = await httpPost(`auth/onboarding_four/${id}`, this.state.postData);
      if(res.code === 201){
        hideLoader();
      }
      console.log(res)
    } catch (error){
			hideLoader();
      console.log(error)
    }
	}

	handleBackButton = () => {
    return this.props.history.push({
      pathname: `${this.props.location.backurl}`,
			savedState: this.props.location.savedState,
			direction: 'backward'
    })
	}
	
	componentDidMount(){
    if(this.props.location.direction === 'backward'){
      this.setState({ moreData: this.props.location.savedState, pageMode: 'edit'});
    } else if(this.props.location.direction === 'completeOnboarding'){
      this.setState({ pageMode: 'completeOnboarding'});
    }
	}

	getLGA = (state) => {
    const lga = getLga(state) || [];
    return lga.length ? lga.map(data => (
      <option value={`${data.name}`}>{data.name}</option>
    )) : <option value="">LGA</option>
  }

  render() {
    return (
      <Layout>
        <div class="app-content">
          <section class="section">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#" class="text-muted">Home</a></li>
              <li class="breadcrumb-item"><a href="#" class="text-muted">Staff</a></li>
              <li class="breadcrumb-item active text-" aria-current="page">New Staff</li>
            </ol>

            <div className="row">
							<div className="col-12">
								<div className="card">
									<div className="card-header custom-header">
									<div className="row col-12">
                    <h4 className="col col-md-6">Guarantor Information</h4>
                    <div className="col col-md-6 text-right" style={ this.state.pageMode === 'completeOnboarding' ? {display: 'none'} : {}}>
                      <button className="cursor-pointer btn btn-primary" onClick={this.handleBackButton}><i class="fa fa-arrow-left" aria-hidden="true"></i>Back</button>
                    </div>
                    </div>
									</div>
									<div className="card-body">
										{ 
											<GuarantorTable
												moreData={this.state.moreData}
												removeMore={this.removeMore} 
											/>
										}

										<div class="card-header custom-header">
                      <button type="button" class="btn " data-toggle="modal" data-target="#guarantorModal">Add Guarantor</button>
										</div>


										<div class="form-group mb-0 mt-5 row justify-content-end">
											<div class="col-md-9">
												<button 
													type="submit"
													class="btn btn-info mr-5"
													// onClick={() => props.props.history.push('/create_staff/five')}
													onClick={this.handleSubmit}
												>NEXT</button>
												<button type="submit" class="btn btn-primary" onClick={this.handleSave}>SAVE</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>


          </section>
        </div>
				<GuarantorModal
					handleChange={this.handleChange}
					addMore={this.addMore}
					postData={this.state.postData}
					getLGA={this.getLGA}
					handleCustomSelect={this.handleCustomSelect}
					errorMessage1={this.state.errorMessage1}
					errorMessage2={this.state.errorMessage2}
					errorMessage3={this.state.errorMessage3}
					errorMessage4={this.state.errorMessage4}
					errorMessage5={this.state.errorMessage5}
					errorMessage6={this.state.errorMessage6}
					errorMessage7={this.state.errorMessage7}
				/>
      </Layout>
    )
  }
}

export default Guarantor;
