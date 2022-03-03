import styles from './Main.module.scss'
import router, { useRouter } from 'next/router'
import React,{FC, InputHTMLAttributes} from 'react';

import {verify} from 'pages/instructor_login/verification/index';

import Axios, { AxiosResponse } from 'axios'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name:string;
    label:string;
}


// function myFunction() {
//   var x = (<HTMLInputElement>document.getElementById("*passwordbox-id*"));
//   // if (x.type === "password") {
//   //   x.type = "text";
//   // } else {
//   //   x.type = "password";
//   // }
// }



export async function getServerSideProps() {


  const serverAddress = 'localhost'
  const serverPort = 4000
  // Fetch data from external API
  let response = await Axios.get(`http://${serverAddress}:${serverPort}/verifyUser`)
  const data = response.data
  console.log(data)
  // if(data.accessToken){
  //   const accessTokenClaims = data.accessToken
  //   console.log(accessTokenClaims[`${response}/user`])
  // }

  if(data){
   router.push('/instructor_view')
  }
  // Pass data to the page via props
  return data;  // returns true 
  // return { props: { data }, }
}



const Main:FC<InputProps> = ({name,label,...rest},{data}) => 
{ const router = useRouter()

  return (
    
    <main id={styles.container}>
      <p>{data}</p>
      <h1>Instructor Login</h1>
      <div className={styles.input}>
      <label htmlFor={name}> Email:{label}</label>
      <input id={name} {...rest} className={styles.emailinput}></input>
      <br></br>
      <label htmlFor={name}>Password:{label}</label>
    <input id={name} {...rest} className={styles.passwordinput}></input>
      <br></br>
      Show Password <input type="checkbox"></input>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
        <button type="button" className ={styles.button}onClick={() => {router.push('/instructor_view')}}>
        Submit
      </button>

      
      <button onClick={() => {getServerSideProps()}}>
       Submission
      </button>

      </div>
    </main>
  )
}

export default Main