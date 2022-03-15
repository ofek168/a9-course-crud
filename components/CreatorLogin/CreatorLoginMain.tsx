import styles from './CreatorLogin.module.scss'
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
  const secret_key = "Creator Secret Key";
  const serverAddress = 'localhost'
  const serverPort = 4000
  // Fetch data from external API
  // let response = await Axios.get(`http://${serverAddress}:${serverPort}/verifyUser`)

  let header = await Axios.get(`http://${serverAddress}:${serverPort}/creatorauth`)

  
  const payload = header.data
  const userToken = payload.token
  var decoded = verify(userToken, secret_key)
  console.log(decoded)
  //this works, returns the payload
  if (userToken) {
    // router.push("/instructor_view")
    localStorage.setItem("creatoruser", JSON.stringify(payload)); // you can change this later nick, for rethinkdb
  }
  return payload;  // returns true 

}

// This is just one other way 
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("creatoruser"); // same as here you can change this later nick, for rethinkdb
  if (userStr) {
    console.log(JSON.parse(userStr)) // for showing the token part. 
    return JSON.parse(userStr);
  }
  return null;
};


const CreatorLoginMain: FC<InputProps> = ({ name, label, ...rest }) => {
  const router = useRouter()
  return (

    <main id={styles.container}>

      <h1>Creator Login</h1>
      <div className={styles.input}>
        <label htmlFor={name}> Email:{label}</label>
        <input id={name} {...rest} className={styles.emailinput} placeholder="Enter Email here" value="admin@ucdavis.edu"></input>
        <br></br>
        <label htmlFor={name}>Password:{label}</label>
        <input id={name} {...rest} className={styles.passwordinput} placeholder="Enter Password"value="********"></input>
        <br></br>
        Show Password <input type="checkbox"></input>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button type="button" className={styles.button} onClick={() => {
          getServerSideProps() // ig this works?
          if (getCurrentUser()) {
            router.push('/creator_view')
          }
        }}>
          Submit
        </button>
        <button type="button" className={styles.button} onClick={() => {
          getServerSideProps() // ig this works?
          if (getCurrentUser()) {
            router.push('/')
          }
        }}>
         Back
        </button>

      </div>
    </main>
  )
}

export default CreatorLoginMain