import styles from './IOptions.module.scss'
import Toggle from './Your_Courses/togglesched'
import Menu from './Menu/Menu'
import Canvas from './Canvas/Canvas'
import Link from 'next/link'
import CollectionsList from '@components/CreatorView/CollectionsView/CollectionsList'
import { sample, sample2 } from '@components/Samples'
import { ICollection, IVocab } from 'interfaces'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import ViewCollection from '@components/CreatorView/ViewCollection'
interface CollectProps {
    collections: ICollection[]
}

const Item = (item: IVocab) => {
    return (
        <div className={styles.item} key={item.value}>
            <h3>{item.value}</h3>
            <h4>{item.translation}</h4>
        </div>
    )
}

const Collection = (col: ICollection) => {
    const router = useRouter()

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        localStorage.clear()
        const data = {
            name: col.name,
            lang: col.lang,
            authorName: col.author.name,
            authorEmail: col.author.email.address,
            items: col.items,
            description: col.description,
            id: col.id ?? undefined
        }
        localStorage.setItem("state", JSON.stringify(data))

        router.push(`/add_collection?edit=true&collection=${col.id}`)
    }
    return (
        <li key={col.id}>
            <div className={styles.collection}>
                <div>
                    <h2>{col.name}</h2>
                    <br />
                    {/* <Link href={`/creator_view/collections/${col.id}`}>
                <a><button>View</button></a>
              </Link> */}
                </div>
                <div>
                    {col.items.map(Item)}
                </div>
            </div>
        </li>
    )

}
const IOptions = ({ collections }: CollectProps) => {
    const router = useRouter()
    return (

        <div id={styles.I_container}>
            <a className={styles.box}>
                <h2 className={styles.font}>Your Courses</h2>
                <div className={styles.showCourses}>
                    Show scheduled courses
                    <div></div>
                </div>

                <div className={styles.coursesBox}>
                    <div className={styles.coursesContent}>
                        <p>SPAN 1 - Intro to Spanish A01</p>
                        <p>Enrolled: 20/20</p>
                        <p>Fall'84</p>
                        <ViewCollection collections={[sample]}></ViewCollection>
                        <div className={styles.courseEdit}>
                            <button id={styles.btn}>View</button>
                            <button id={styles.btn}>Edit</button>
                            <button id={styles.btn}>Export</button>
                        </div>
                        <div className={styles.courseCollection}>

                        </div>
                    </div>

                    <div className={styles.coursesContent}>
                        <p>SPAN 1 - Intro to Spanish A01</p>
                        <p>Enrolled: 20/20</p>
                        <p>Fall'84</p>
                        <ViewCollection collections={[sample2]}></ViewCollection>
                        <div className={styles.courseEdit}>
                            <button id={styles.btn}>View</button>
                            <button id={styles.btn}>Edit</button>
                            <button id={styles.btn}>Export</button>
                        </div>
                        <div className={styles.courseCollection}>

                        </div>
                    </div>
                    <div className={styles.coursesContent}>
                        <p>SPAN 1 - Intro to Spanish A01</p>
                        <p>Enrolled: 20/20</p>
                        <p>Fall'84</p>
                        <div className={styles.courseEdit}>
                            <button id={styles.btn}>View</button>
                            <button id={styles.btn}>Edit</button>
                            <button id={styles.btn}>Export</button>
                        </div>
                        <div className={styles.courseCollection}>

                        </div>
                    </div>
                </div>
            </a>
            <div className={styles.box1}>
                <h2 className={styles.font}>Tools</h2>

                <br></br>
                <div id={styles.box2}>
                    <h1 className={styles.font2}>Classes</h1>
                    <div id={styles.box4}>
                        <Menu />
                    </div>
                </div>
                <div id={styles.box3}>
                    <h3 className={styles.font2}>Canvas</h3>
                    <Canvas />
                </div>
                <div id={styles.messageBox}>
                    <h3 className={styles.font2}>Messages</h3>
                    <div></div>
                </div>

            </div>



        </div>


    )
}

export default IOptions