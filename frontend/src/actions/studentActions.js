import axios from 'axios'
import {
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_FAIL,
  STUDENT_CLASS_LIST_REQUEST,
  STUDENT_CLASS_LIST_SUCCESS,
  STUDENT_CLASS_LIST_FAIL,
  STUDENT_SEARCH_REQUEST,
  STUDENT_SEARCH_SUCCESS,
  STUDENT_SEARCH_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  STUDENT_DELETE_FAIL,
  STUDENT_DELETE_SUCCESS,
  STUDENT_DELETE_REQUEST,
  STUDENT_ATTENDANCE_FAIL,
  STUDENT_ATTENDANCE_SUCCESS,
  STUDENT_ATTENDANCE_REQUEST,
  STUDENT_FEES_REQUEST,
  STUDENT_FEES_SUCCESS,
  STUDENT_FEES_FAIL,
} from '../constants/studentConstants'



export const listStudents = () => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_LIST_REQUEST,
    })
    const { data } = await axios.get('/api/students')
    dispatch({
      type: STUDENT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const classlistStudent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_CLASS_LIST_REQUEST,
    })
    const { data } = await axios.get(`/api/students/class/${id}`)
    dispatch({
      type: STUDENT_CLASS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STUDENT_CLASS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const studentSearch = (name, classname, rollno) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_SEARCH_REQUEST,
    })
    console.log(name, classname, rollno)
    const { data } = await axios.get(
      `/api/students/search/${name}/${classname}/${rollno}`
    )
    console.log('Data is ', data)
    dispatch({
      type: STUDENT_SEARCH_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STUDENT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const Register = (
  student_name,
  classname,

  address,
  parents_name,

  contact_no,
  gender,
  age,
  email,
  registration_fees,
  
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_REGISTER_REQUEST,
    })
    
    const {
      userLogin: { userCred },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCred.token}`,
      },
    }
    const { data } = await axios.post(
      '/api/students/register',
      {
        student_name,
        classname,

        address,
        parents_name,

        contact_no,
        gender,
        age,
        email,
        registration_fees,
      },
      config
    )
    dispatch({
      type: STUDENT_REGISTER_SUCCESS,
      payload: data,
    })
    
    
  } catch (error) {
    dispatch({
      type: STUDENT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_DELETE_REQUEST,
    })
    const { data } = await axios.delete(`/api/students/delete/${id}`)
    dispatch({
      type: STUDENT_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const studentAttendances = (classname, students) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: STUDENT_ATTENDANCE_REQUEST,
    })
    
    const {
      userLogin: { userCred },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCred.token}`,
      },
    }
    const { data } = await axios.post(
      `/api/students/attendance/${classname}`,
      {
        students,
      },
      config
    )
    dispatch({
      type: STUDENT_ATTENDANCE_SUCCESS,
      payload: data,
    })
    
    
  } catch (error) {
    dispatch({
      type: STUDENT_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const PayFees = (
  studentId,
  student_name,

  classname,
  roll_no,
  month_name,
  year,
  monthly_fees,
  hostel_fees,
  laboratory_fees,
  computer_fees,
  exam_fees,
  miscellaneous
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_FEES_REQUEST,
    })
    
    const {
      userLogin: { userCred },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCred.token}`,
      },
    }
    const { data } = await axios.post(
      `/api/students/fees/${studentId}`,
      {
        student_name,
        classname,
        roll_no,
        month_name,
        year,
        monthly_fees,
        hostel_fees,
        laboratory_fees,
        computer_fees,
        exam_fees,
        miscellaneous,
      },
      config
    )
    dispatch({
      type: STUDENT_FEES_SUCCESS,
      payload: data,
    })
    
    
  } catch (error) {
    dispatch({
      type: STUDENT_FEES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
