import styles from './Canvas.module.scss'
import Link from 'next/link';
import Home from 'pages';

const Canvas = () => {

    return (
        <div className={styles.container}>


            <Link href="/"><a className={styles.a}><button className={styles.box}>Export all classes</button></a></Link>

            <br></br>

            <Link href="/"><a className={styles.a}><button className={styles.box}>My assessments</button></a></Link>

            <br></br>

            <Link href="/"><a className={styles.a}><button className={styles.box}>Create assessment</button></a></Link>

        </div>
    )

}

export default Canvas