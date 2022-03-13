import styles from './ViewCollection.module.scss'
import { ICollection, IVocab } from 'interfaces'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MouseEvent } from 'react'
import { useRouter } from 'next/router'
// export const getStaticPaths = async () => {

// }

// const ViewCollection = () => {
//   useEffect(() => {

//   }, [])

//   return (
//     <div>

//     </div>
//   )
// }

// export default ViewCollection

interface Props {
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

const ViewCollection = ({ collections }: Props) => {
  const router = useRouter()

  return (

    <ul id={styles.list}>
      {collections.map(Collection)}
    </ul>

  )
}

export default ViewCollection

