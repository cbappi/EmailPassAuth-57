import React from 'react';
const OnBlurForm = () => {

      const handleEmailBlur = event => {
        console.log(event.target.value);
      }
    
      const handlePasswordBlur = event => {
        console.log(event.target.value);
      }

      const handleFormSubmit = event =>{
        console.log("form submitted")
        event.preventDefault();
      }
    
      return (
        <div className='container w-50 mx-auto mt-5'>
            <form onSubmit={handleFormSubmit}>
            Email:
            <br/>
            <input onBlur={handleEmailBlur} type="email" name="" 
             id="" className='mb-2'/>
            <br/>
            Password:
            <br/>
            <input onBlur={handleEmailBlur} type="password" name="" 
            id="" className='mb-2' />
            <br />
            <input onBlur={handlePasswordBlur} type="submit" 
            value="Login" className='mb-2 btn btn-info' />
            </form>    
          </div>     
      );
    }
    
export default OnBlurForm;