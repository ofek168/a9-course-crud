import styles from './Main.module.scss'
import router, { useRouter } from 'next/router'
import IOptions from './IOptions'
import React, { useState, FC, InputHTMLAttributes } from 'react';
import { ICollection,ICourse } from 'interfaces'
import {ViewCollectionWithDelete,AddCollections,ViewTemplates, ViewCollection_2} from '@components/CreatorView/ViewCollection';
import ClickAwayListener from 'react-click-away-listener';
import Axios from 'axios';

const PORT = '4000';
const HOST = 'localhost'; // 'DOCKER_NODE_SERVICE'; // 'localhost'
const GET_END_POINT = 'getCollections';
const PUT_Collection_END_POINT = 'submit_Edited_Collections'; //requires endpoint for


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

  const Main = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupTemplate, setButtonPopupTemplate] = useState(false);
  const [currentCollections,setCurrentCollections] = useState<ICollection[]>([]);
  const [serverCollections,setServerCollections] = useState<ICollection[]>([]);
  const [selectedCollections,setSelectedCollections] = useState<ICollection[]>([]);
  const [templates, setTemplates] = useState<ICourse[]>([]);
  return (
    <main id={styles.container}>
      <h1>Instructor View</h1>
      <div className={styles.mydiv}>
        <button type="button" className={styles.button} onClick={() => { //button goes back to instructor_login
          router.push('/instructor_login')
        }
        }>
          Back
        </button>
      </div>
      <IOptions />
      <div>
                <button type="button" className={styles.button} onClick={() => { // edit current collections
                    Axios.get(`http://${HOST}:${PORT}/${GET_END_POINT}`).then( function (response){
                        console.log(response.data);
                        setServerCollections(response.data);
                        setSelectedCollections([]);
                        setButtonPopup(true);
                    });
                }
                }>
                    Edit Current Collections
                </button>

                {buttonPopup && (
                    <ClickAwayListener onClickAway={() => setButtonPopup(false)}>
                        <div className={styles.modal}>
                            <div className={styles.modal_content}>
                            { 
                                <AddCollections serverCollections={serverCollections} serverUpdateState={setServerCollections} 
                                selectStates={selectedCollections} selectUpdateStates= {setSelectedCollections}/>
                                
                            }
                            <button type="button" className={styles.button} onClick={() => {
                            //change collection state here
                            setCurrentCollections(currentCollections.concat(selectedCollections));
                            setSelectedCollections([]);
                            setButtonPopup(false);
                            {
                            Axios.put(`http://${HOST}:${PORT}/${PUT_Collection_END_POINT}`,currentCollections); //send put request
                            }
                                }
                                }>
                                    Submit
                            </button>

                            <button type="button" className={styles.button} onClick={() => {
                                setSelectedCollections([]);
                                setButtonPopup(false);
                                }
                                }>
                                    Cancel
                            </button>
                            </div>
                        </div>
                        
                    </ClickAwayListener>
                    
                )}

                {buttonPopupTemplate && (
                    <ClickAwayListener onClickAway={() => setButtonPopupTemplate(false)}>
                        <div className={styles.modal}>
                            <div className={styles.modal_content}>
                                { <ViewTemplates templates={templates} currentCollections={currentCollections} setCurrentCollections={setCurrentCollections} setButtonPopupTemplate= {setButtonPopupTemplate}/>}
                                <button type="button" className={styles.button} onClick={() => {
                                //change collection state here
                                setCurrentCollections(selectedCollections);
                                setSelectedCollections([]);
                                setButtonPopupTemplate(false);
                                    }
                                    }>
                                        Cancel
                                </button>
                            </div>
                        </div>
                        
                    </ClickAwayListener>
                    
                )}

               
               
            </div>


    </main>
  )
}

export default Main
