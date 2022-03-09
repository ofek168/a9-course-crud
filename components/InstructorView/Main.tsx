import styles from './Main.module.scss'
import router, { useRouter } from 'next/router'
import IOptions from './IOptions'
const Main = () => {
  return (
    <main id={styles.container}>
      <h1>Instructor View</h1>
      <IOptions />
      <button type="button" className={styles.button} onClick={() => {
        router.push('/instructor_login')
      }
      }>
        Back
      </button>
    </main>
  )
}

export default Main
