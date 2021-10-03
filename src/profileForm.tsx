import { Button, FormLabel, FormGroup, FormControl,FormText, Form as FormBT } from 'react-bootstrap';
import { Field, Form } from "react-final-form";
import {Profile} from './AppTypes'

 const sleep = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms));



const validate = (values: any) => {
  const errors:any = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.bio) {
    errors.bio = "Required";
  } 

  return errors;
}


const MyForm = (props:any) => {
  
  const profile:Profile = props.profile;
  
  const onSubmit = async (values:Profile) => {
     await sleep(300);
    // window.FormText(JSON.stringify(values));
    props.onChange(values);
  };

  let formData = profile ;

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues = {formData}
      render={({ handleSubmit, values }) => (
        <FormBT onSubmit={handleSubmit} className="col-8 p-10" >

          <h2>Simple Default Input</h2>
          <FormGroup className="m-3">
            <FormLabel>First Name</FormLabel>
            <Field name="firstName" component="input" placeholder="First Name" className="form-control" />
          </FormGroup>



          <Field name="lastName"
            render={({ input, meta }) => (
              <FormGroup className="m-3">
                <FormLabel>Last Name</FormLabel>
                <FormControl placeholder="Last Name"  {...input} />
                {meta.touched && meta.error && <FormText className="text-danger">{meta.error}</FormText>}
              </FormGroup>
            )}
          />


          <h2>Render Function</h2>
          <Field
            name="bio"
            render={({ input, meta }) => (
              <FormGroup className="m-3">
                <FormLabel>Bio</FormLabel>
                <FormControl placeholder="Bio" as="textarea" rows={3} {...input} />
                {meta.touched && meta.error && <FormText className="text-danger">{meta.error}</FormText>}
              </FormGroup>
            )}
          />

          <h2>Render Function as Children</h2>
          <Field name="phone">
            {({ input, meta }) => (
              <FormGroup className="m-3">
                <FormLabel>Phone</FormLabel>
                <FormControl {...input} placeholder="Phone" />
                {meta.touched && meta.error && <FormText className="text-danger">{meta.error}</FormText>}
              </FormGroup>
            )}
          </Field>

          <Button type="submit" variant="primary" >Submit</Button>

          <pre>{JSON.stringify(values)}</pre>
        </FormBT>
      )}
    />
  )

}



export default MyForm;