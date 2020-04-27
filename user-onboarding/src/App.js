import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as yup from 'yup'

// import User component
import User from './components/User'
import Form from './components/Form';

//good practice not to pepper code with stray urls/links; use variables
const url = 'https://reqres.in/api/users'

//this is the shape of the state that drives the form
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

//STEP 7 - BUID A SCHEMA FOR VALIDATION

//---> start by building initialFormErrors object

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}

//---> next, build form schema

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'username must ahve atleast 3 characters!!')
    .required('username is required'),
  email: yup
    .string()
    .email('a VALID email is required')
    .required('email is required'),
  password: yup
    .string()
    .min(6, 'please use 6 characters')
    .required('whats your password??'),
})

export default function App() {
  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)

  // STEP 1: WE NEED STATE TO KEEP TRACK OF WHETHER SUBMIT BUTTON IS DISABLED!
  const [formDisabled, setFormDisabled] = useState(true)

  /// STEP 2: WE NEED STATE TO KEEP TRACK OF THE VALIDATION ERRORS!
  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const getUsers = () => {
    //STEP 3: WE NEED TO FETCH USERS FROM THE API & SET THEM IN STATE
    axios.get(url)
      .then(response => {
        console.log('response', response)
        setUsers(response.data.data)
      })
      .catch(error => {
        debugger
      })
  }

  useEffect(() => {
    //STEP 4: AFTER THE FIRST DOM SURGER WE NEED FRIENDS FROM API!
    getUsers()
  }, [])



  const postUser = user => { //minus id
    //STEP 5: WE NEED A FUNCTINO TO POST A NEW FRIEND TO THE API
    //and set the updated list of users in state 
    //the endpoint responds (on success) with the new friend (with id)
    axios.post(url, user) //second argument with a payload that ships back the 'user' object being passed into postUsers
      .then(response => {
        setUsers([...users, response.data])
      })
      .catch(error => {
        debugger
      })
  }

  //STEP 8: IF THE FORM VALUES CHANGE, WE NEED TO RUN VALIDATION 

  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => { //either true or false
        setFormDisabled(!valid)
      })
  }, [formValues])

  //STEP 6: WE NEED TO POST OUR NEW USER TO THE API
  // ---> create an onSubmit function that takes 'newUser' object and posts it to the api

  const onSubmit = e => {
    e.preventDefault()

    const newUser = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      terms: formValues.terms === true,
    }

    // ---> post user to api: 
    postUser(newUser);
    setFormValues(initialFormValues)
  }



  // STEP 9: HANDLE INPUT CHANGES
    /* the last thing we need to do before validating the form is set up an event handler called inputChange and pass in the event parameter. React uses it's own event system (known as a 'synthetic event'). these events are meant to look like normal DOM events, and in the majority of cases we can use them in the same way. however, there are some small inconsistencies. one of those differences is the face that we can not use the React event object in an asynchronous way on its own. if you plan on using the event object in a callback or a promise resolution you will need to call .persist() on your event object before you use it. do more research about it!!! - if not , remember to use event.persist() and you will be good */


  const onInputChange = e => {
    // pull these out first (if you do this, no need for event.persist^)
    const name = e.target.name
    const value = e.target.value

    //if the values change, we need to run validation and update the form errors slice of state
    yup
      .reach(formSchema, name) //will allow us to 'reach' into the schema and test only one part. .reach recieves the schema as the first   argument, and the key we want to test as the second. 
      .validate(value) //we can run validate using the value 
      .then(valid => {
        // validates :)
        // CLEAR ERROR
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch(err => {
        // does not validate :(
        // SET THE ERROR IN THE RIGHT PLACE
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const onCheckboxChange = e => {
    const { name } = e.target
    const isChecked = e.target.isChecked
    
    setFormValues({
      ...formValues,
      [name]: isChecked
    })
  }

  return (
    <div className="App">
      <Form
      values={formValues}
      onInputChange={onInputChange}
      onCheckboxChange={onCheckboxChange}
      onSubmit={onSubmit}
      disabled={formDisabled}
      errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}
