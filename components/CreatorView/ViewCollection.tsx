import styles from './ViewCollection.module.scss'
import { ICollection, IVocab } from 'interfaces'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MouseEvent } from 'react'
import { useRouter } from 'next/router'
import {ICourse} from 'interfaces'
import ClickAwayListener from 'react-click-away-listener';
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

interface CollectionViewProp{
  collections: ICollection[]
  updateState: React.Dispatch<React.SetStateAction<ICollection[]>>
}

interface CollectionSelectProp{
  serverCollections: ICollection[]
  serverUpdateState: React.Dispatch<React.SetStateAction<ICollection[]>>
  selectStates: ICollection[]
  selectUpdateStates: React.Dispatch<React.SetStateAction<ICollection[]>>
}

interface TemplateSelectProp{
  templates: ICourse[];
  currentCollections: ICollection[]
  setCurrentCollections: React.Dispatch<React.SetStateAction<ICollection[]>>
  setButtonPopupTemplate: React.Dispatch<React.SetStateAction<boolean>>;
  //confirmationPopup: boolean;
  //setConfirmationPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const Extra_Collection = (col: ICollection) => {
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
          <h6>{col.name}</h6>
          <h4> Description: {col.description} </h4>
          <h4>ID:  {col.id} </h4>
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


const ViewCollection_2 = ({ collections }: Props) => {
  const router = useRouter()

  return (

    <ul id={styles.list}>
      {collections.map(Extra_Collection)}
    </ul>

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

const ViewCollectionWithDelete = ({collections, updateState}: CollectionViewProp) => {
  const router = useRouter();
  return (
    <ul id={styles.list}>
      {collections.map((Collection) => {
          return <div className={styles.tableNameContainer} >
              <ViewCollection collections = {[Collection]}/>
              <button className={styles.deleteTableButton} onClick={async (e) => {
                  e.preventDefault();
                  let index = collections.indexOf(Collection);
                  if (index !== -1) {
                    collections.splice(index, 1);
                  }
                  router.replace(router.asPath);
              }}>❌</button>
      </div>
        }
      )}
    </ul>
  )
}

const AddCollections = ({serverCollections,serverUpdateState,selectStates,selectUpdateStates}: CollectionSelectProp) => {
  const router = useRouter();
  return (
    <ul id={styles.list}>
      {
      
      serverCollections.map((Collection) => {
          return <div className={styles.tableNameContainer} >
          <ViewCollection collections = {[Collection]}/>
          <div >
              <button className={styles.deleteTableButton} onClick={async (e) => {
                e.preventDefault();
                let index = serverCollections.indexOf(Collection);
                if (index !== -1) {
                  serverCollections.splice(index, 1);
                }
                selectUpdateStates(selectStates.concat(Collection));
                router.replace(router.asPath);
                  
              }}>✅</button>
          </div>
      </div>
        }
      )}
    </ul>
  )
}

const ViewTemplates = ({templates,currentCollections,setCurrentCollections,setButtonPopupTemplate}: TemplateSelectProp) => {
  const router = useRouter();
  return (
    <ul id={styles.list}>
      {
      templates.map((Course) => {
        const [confirmationPopup, setConfirmationPopup] = useState(false);
          return <div className={styles.tableNameContainer} >
            <div className = {styles.courseWrapper}>
              <div id ={styles.title}>
                {Course.name}
                <button className={styles.deleteTableButton} onClick={async (e) => {
                e.preventDefault();
                setConfirmationPopup(true);
                //setCurrentCollections(Course.collections);
                //setButtonPopupTemplate(false);
              }}>✅</button>

              {confirmationPopup && (
                  <ClickAwayListener onClickAway={() => setConfirmationPopup(true)}>
                      <div className={styles.modal}>
                          <div className={styles.modal_content}>
                            <p>
                            Are you sure you want to use {Course.name} as your template?
                            </p>
                            <button type="button" className={styles.button} onClick={() => {
                              setCurrentCollections(Course.collections);
                              setButtonPopupTemplate(false);
                              setConfirmationPopup(false);
                                }
                                }>
                                  Yes
                            </button>

                            <button type="button" className={styles.button} onClick={() => {
                                setConfirmationPopup(false);
                                }
                                }>
                                  No
                            </button>
                          </div>
                      </div>
                      
                  </ClickAwayListener>
                  
              )}
              </div>
              {Course.collections.map(Collection)}
            </div>
              
          </div>
        }
      )}
    </ul>
  )
}

export {ViewCollection, ViewCollection_2,ViewCollectionWithDelete,AddCollections,ViewTemplates }
