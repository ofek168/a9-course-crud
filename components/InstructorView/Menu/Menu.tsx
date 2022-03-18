import styles from './Menu.module.scss'
import Link from 'next/link';
import Home from 'pages';
import router from 'next/router';

const Menu = () => {

    return (
        <div>
           
                <Link href="/create_new_course"><a className={styles.a}><button className={styles.box}>Create New Course</button></a></Link>

            <br></br>
    
                <Link href="/"><a className={styles.a}><button className={styles.box}>Course Template</button></a></Link>
          
            <br></br>
           
                <Link href="/"><a className={styles.a}><button className={styles.box}>Archived Courses</button></a></Link>
            




        </div>

    )


}

export default Menu