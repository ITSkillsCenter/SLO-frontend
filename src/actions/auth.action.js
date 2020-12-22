import axios from "axios";
import { showLoader, hideLoader } from "../helpers/loader";
import { NotificationManager } from "react-notifications";
import { baseUrl } from './data.action';

export const getUser = () => {
	return async (dispatch) => {
		// if (!navigator.onLine) {
		//   return toast.warning('Please check your internet');
		// }
		try {
			const result = await axios.get(`${baseUrl}auth/single_staff`, {
				headers: { Authorization: localStorage.token },
			});
			console.log(result);
			let { data } = result;
			const { user, privileges, roles } = data.data;
			// localStorage.setItem("token", token);
			return dispatch({
				type: "GET_USER_DETAILS",
				payload: { user, privileges, roles },
			});
		} catch (error) {
			// return NotificationManager.error(error.response.data.message);
		}
	};
};

export const registerNewUser = (userInformation) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				`${baseUrl}/api/auth/register`,
				userInformation,
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			const { userDetails, token } = data.data;
			localStorage.setItem("api_token", token);
			return dispatch({
				type: "SIGN_UP_SUCCESS",
				payload: { userDetails, token },
			});
		} catch (error) {
			//showLoader(error.response.data.message)
			// return error;
			return NotificationManager.error(error.response.data.message);
		}
	};
};

export const logUserIn = (userInformation) => {
	return async (dispatch) => {
		// if (!navigator.onLine) {
		//   return toast.warning('Please check your internet');
		// }
		try {
			const { data } = await axios.post(
				`${baseUrl}auth/login`,
				userInformation,
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			const { role, onBoarding, applicationStatus, token, id, user } = data.data;
			localStorage.setItem("token", token);
			// console.log(role)
			return dispatch({
				type: "SIGN_IN_SUCCESS",
				payload: { role, token, user },
			});
		} catch (error) {
      hideLoader();
      if(error.response.data.code === 400 || error.response.data.code === 404){
        return NotificationManager.error(error.response.data.message);
      };
      return NotificationManager.error(('Something went wrong. Please retry.'),'Oops!',3000);
		}
	};
};

export const updateAvatar = (avatar) => {
	return async (dispatch) => {
		try {
			// const { data } = await http.patch('/users/update_avatar',avatar)
			const { data } = await axios.patch(
				`${baseUrl}/api/users/update_avatar`,
				avatar,
				{
					headers: {
						Authorization: localStorage.api_token,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			if (data.code === 200) {
				const { userDetails, token } = data.data;
				localStorage.setItem("api_token", token);
				NotificationManager.success(data.message);
				return dispatch({
					type: "UPDATE_AVATAR",
					payload: { userDetails },
				});
			}
		} catch (error) {
			return NotificationManager.error(error.response.data.message);
		}
	};
};

export const updateCoverImage = (avatar) => {
	return async (dispatch) => {
		try {
			// const { data } = await http.patch('/users/update_avatar',avatar)
			const { data } = await axios.patch(
				`${baseUrl}/api/users/update_cover_image`,
				avatar,
				{
					headers: { Authorization: localStorage.api_token },
				}
			);
			if (data.code === 200) {
				const { userDetails, token } = data.data;
				localStorage.setItem("api_token", token);
				NotificationManager.success(data.message);
				return dispatch({
					type: "UPDATE_AVATAR",
					payload: { userDetails },
				});
			}
		} catch (error) {
			return NotificationManager.error(error.response.data.message);
		}
	};
};

export const onLogout = () => {
	return async (dispatch) => {
		try{
			// Your code here...
			const data = await axios.post(
				`${baseUrl}/api/auth/sign_out`, {},
				{
					headers: { Authorization: localStorage.api_token },
				}
			);
			// if(data.code === 200) {
			// 	return dispatch({ type: "LOGOUT" });
			// }
			return dispatch({ type: "LOGOUT" });
		}catch(error){
			// return NotificationManager.error(error.response.data.message);
		}
	};
};
