import React from 'react';
//import './adduser.css';
class AddUser extends React.Component{
    state = {
        firstname : '',
        lastname : '',
        telephone : '',
        gender : '',
        skill : '',
        message : '',
        email: "",
        isSubmitDisabled: true,
        touched : {
            firstname : false,
            lastname : false,
            telephone : false,
            gender : false,
            skill : '',
            message : '',
            email:''
        }
    }


handleBlur  = e =>{
    let name =  e.target.name;
    this.setState({
        touched : {...this.state.touched, [name] :true},
    })
}



validate = (firstname , lastname, telephone, email) => {


    let errors = {
    firstName : '',
    lastName : '',
    telePhone : '',
    email : '',
    isSubmitDisabled: true
    
};

let err = 0

if (!this.state.firstname || firstname.length < 3){
    errors.firstName = 'First Name must be longer than 3 character.';
    err+= 1

}
if (!this.state.firstname || firstname.length > 15) {
    errors.firstName = 'First Name should be less than 15 characters.';
    err+= 1
  }


if(!this.state.lastname || lastname.length < 3){
    errors.lastName = 'Last name must be longer than 3 character';
    err+= 1
}
if(!this.state.lastname || lastname === firstname){
    errors.lastName = 'Last name and FirstName must be diffrent';
    err+= 1
}

if(!this.state.telephone || !( /^[0-9]{10}$/).test(telephone)){
    errors.telePhone = 'Telephone number must be 10 digits'; 
    err+= 1
}

if(!this.state.email || !(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).test(email)){
    errors.email = " Email must atleast contain @";
    err+= 1
}

errors.isSubmitDisabled = err > 0 ? true : false  



return errors;
};


   
handleChange = e => {
    let target = e.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
        [name]:value
   
    }, function(){ this.canSubmit()})
}

canSubmit() {
    // const { email, firstname, lastname,telephone } = this.state
    // if (email != null && firstname != null  && lastname != null && telephone != null) {
    //   this.setState({
    //     isSubmitDisabled: false
    //   })
    // }
    // else {
    //   this.setState({
    //     isSubmitDisabled: true
    //   })
    // }

    const {firstname , lastname , telephone, email } = this.state
    const errors = this.validate(firstname,lastname,telephone, email);
    const {isSubmitDisabled} = errors
    this.setState({isSubmitDisabled})

  }



handleSelectOption = e => {
    this.setState({
        gender : e.target.value
    });
    
}



handleSubmit = e =>{
    e.preventDefault();
    const { email, firstname, lastname,telephone } = this.state
    alert(`Your registration detail: 
           Email: ${email} 
           First Name: ${firstname} 
           Last Name: ${lastname}
           Telephone: ${telephone}`)
    //this.props.totalUser();
    this.props.addUser(this.state);
}



    render(){
        const {firstname , lastname , telephone, email } = this.state
        const errors = this.validate(firstname,lastname,telephone, email);
        console.log(errors);
//        const serror = errors.isSubmitDisabled
        return(
        
        <div className="form">
            <form onSubmit={this.handleSubmit}>
            <input 
                type="text"
                name="firstname"
                value={this.state.firstname}
                placeholder="First Name"
                onChange={this.handleChange}
                onBlur = {this.handleBlur}
              />
            <br />
            <p>{errors.firstName}</p>
              <input
                type="text"
                name="lastname"
                value={this.state.lastname}
                placeholder="Last Name"
                onChange = {this.handleChange}
                onBlur = {this.handleBlur}
                />
                <br />
                <p>{errors.lastName}</p>
                <input 
                type="number"
                name="telephone"
                value={this.state.telephone}
                placeholder="TelePhone"
                onChange={this.handleChange}
                onBlur = {this.handleBlur}
              />
            <br />
            <p>{errors.telePhone}</p>
                
            <input 
                type="email"
                name="email"
                value={this.state.email}
                placeholder="Email"
                onChange={this.handleChange}
                onBlur = {this.handleBlur}
              />
            <br />
            <p>{errors.email}</p>
            <div className="selector">
            <label>Gender: </label>
            <label>Male</label>
            <input
                type="radio"
                checked={this.state.gender === "male"}
                value="male"
                onChange={this.handleSelectOption}
                onBlur = {this.handleBlur}
                />
            <label>Female</label>
            <input
                type="radio"
                name= "female"
                checked={this.state.gender==="female"}
                value= "female"
                onChange={this.handleSelectOption}
                onBlur = {this.handleBlur}/>
            <label>Others</label>
            <input
                type= "radio"
                value="others"
                checked={this.state.gender==="others"}
                onChange={this.handleSelectOption}
                onBlur = {this.handleBlur}
                />
            <br />
            <label>Skills</label>
            <br />
            <select
                name="skill"
                value={this.state.skill}
                onChange={this.handleChange}
                onBlur = {this.handleBlur}>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">Java Script</option>
            <option value = "React">React.js</option>
            </select>
            </div>
                
            <br />
            <label>Message : </label>
            <br />
            <textarea
                rows= "10"
                cols="60"
                name="message"
                value={this.state.message}
                placeholder="please write your comments here!"
                onChange={this.handleChange}
                onBlur = {this.handleBlur}
              />
            <br />

            <button className={this.state.isSubmitDisabled ? "disableSubmit" : "submit" }  disabled={this.state.isSubmitDisabled}>Submit</button>
            
            
          
            </form>
            </div>
       )    
    }
}

export default AddUser;