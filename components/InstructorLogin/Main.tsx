import styles from './Main.module.scss'
import router, { useRouter } from 'next/router'
import React, { FC, InputHTMLAttributes } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Axios, { AxiosResponse } from 'axios'
import { json } from 'node:stream/consumers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export async function getServerSideProps() {
  const serverAddress = 'localhost'
  const serverPort = 4000
  // Fetch data from external API
  // let response = await Axios.get(`http://${serverAddress}:${serverPort}/verifyUser`)

  let header = await Axios.get(`http://${serverAddress}:${serverPort}/auth`)
  const payload = header.data
  const userToken = payload.token
  //this works, returns the payload
  if (userToken) {
    router.push("/instructor_view")
    localStorage.setItem("user", JSON.stringify(payload)); // you can change this later nick, for rethinkdb
  }
  return payload;  // returns true 

}

// This is just one other way 
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user"); // same as here you can change this later nick, for rethinkdb
  console.log(userStr)
  if (userStr) {
    //console.log(JSON.parse(userStr)) // for showing the token part. 
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
        <button type="button" className={styles.button} onClick={() => { 
          if (getCurrentUser()) { 
            router.push('/instructor_view') 
          } 
          }}>
          Submit
        </button>

      </div>
    </main>
  )
}

export default Main