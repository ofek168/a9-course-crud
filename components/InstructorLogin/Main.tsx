import styles from './Main.module.scss'
import router, { useRouter } from 'next/router'
import React, { FC, InputHTMLAttributes } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Axios, { AxiosResponse } from 'axios'
import { json } from 'node:stream/consumers';
import { verify } from 'jsonwebtoken';



interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}



export async function getServerSideProps() {
  const secret_key = "This is so secret";
  const serverAddress = 'localhost'
  const serverPort = 4000
  // Fetch data from external API
  let response = await Axios.get(`http://${serverAddress}:${serverPort}/instructorauth`)
  const packages = response.data
  const encrypted_jwt = packages.token
  var decoded = verify(encrypted_jwt, secret_key)
  console.log(decoded)

  let header = await Axios.get(`http://${serverAddress}:${serverPort}/instructorauth`)


  const payload = header.data
  const userToken = payload.token


  //this works, returns the payload
  if (userToken) {
    // router.push("/instructor_view")
    localStorage.setItem("instructoruser", JSON.stringify(payload)); // you can change this later nick, for rethinkdb
  }
  return payload;  // returns true 

}



// This is just one other way 
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("instructoruser"); // same as here you can change this later nick, for rethinkdb
  if (userStr) {
    console.log(JSON.parse(userStr)) // for showing the token part. 
    return JSON.parse(userStr);
  }
  return null;
};


const Main: FC<InputProps> = ({ name, label, ...rest }) => {
  const router = useRouter()
  return (

    <main id={styles.container}>

      <h1>Instructor Login</h1>
      <div className={styles.input}>
        <label htmlFor={name}> Email:{label}</label>
        <input id={name} {...rest} className={styles.emailinput} placeholder="Enter Email here" name={name} value="test@email.com"></input>
        <br></br>
        <label htmlFor={name}>Password:{label}</label>
        <input id={name} {...rest} className={styles.passwordinput} placeholder="Enter Password" value="********"></input>
        <br></br>
        Show Password <input type="checkbox"></input>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className={styles.box}>
        <button type="button" className={styles.button} onClick={() => {
            // ig this works?
              router.push('/')
          }}>
            Back
          </button>
          </div>
          <div className={styles.box}>
          <button type="button" className={styles.button1} onClick={() => {
          getServerSideProps() // ig this works?
          if (getCurrentUser()) {
            router.push('/instructor_view')
          }
        }}>
          Submit
        </button>
        </div>
        
       

        <br></br>
       

      </div>
    </main>
  )
}

export default Main