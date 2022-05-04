import React, { FC, InputHTMLAttributes } from 'react';
import styles from './createcourse.module.scss'
import Link from 'next/link'
import { sample, sample2, coursesample } from '@components/Samples'
import { ICollection } from 'interfaces'
import CollectionsList from '@components/CreatorView/CollectionsView/CollectionsList';
import router, { useRouter } from 'next/router'
import ViewCollection from '@components/CreatorView/ViewCollection';
import InstructorCourse from '@components/InstructorView/Icourses';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}
const Main: FC<InputProps> = ({ name, label, ...rest }) => {
    return (
        <main className = {styles.container}>
            <h1 className = {styles.title} >Create New Course</h1>
            <div className = {styles.courseBoxWrapper}>
                <div className = {styles.courseInfoBox}>
                    <div id = {styles.inputs}>
                        <label htmlFor={name}> Course Name:{label}</label>
                        <input id={name} {...rest} className={styles.input} placeholder="Type Something..." ></input>
                    </div>
                    <div id = {styles.inputs}>
                        <h2>Year</h2>
                        <select>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                        </select>  
                    </div>
                    <div id = {styles.inputs}>
                        <h2>Quarter/Semester</h2>
                        <select>
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </select>
                    </div>
                </div>
                <div className = {styles.courseTimeBox}>
                    <div id = {styles.inputs}>
                        <label htmlFor={name}> Maximum Enrolled:{label}</label>
                        <input id={name} {...rest} className={styles.input} placeholder="Type Something..." ></input>
                    </div>
                    <div id = {styles.inputs}>
                        <label htmlFor={name}> Class Time:{label}</label>
                        <input id={name} {...rest} className={styles.input} placeholder="Type Something..." ></input>
                    </div>
                    <div id = {styles.inputs}>
                        <h2>Location</h2>
                        <select>
                            <option>In Person</option>
                            <option>Zoom</option>
                        </select>
                    </div>
                    <div id = {styles.inputs}>
                        <label htmlFor={name}> Location/Zoom Link:{label}</label>
                        <input id={name} {...rest} className={styles.input} placeholder="Type Something..." ></input>
                    </div>
                </div>
            </div>
            <h1 className = {styles.title}>My Collection</h1>
            <div>
                <ViewCollection collections={[sample, sample2]}></ViewCollection>
                <button type="button" className={styles.button} onClick={() => {
                    router.push('/')
                }
                }>
                    Select New Collection
                </button>
                <button type="button" className={styles.button} onClick={() => {
                    router.push('/instructor_view')
                }
                }>
                    Back
                </button>

            </div>
            <div className = {styles.instructorCourse}>
            <InstructorCourse courses={[coursesample]}></InstructorCourse>
            </div>
        </main>


    )
}

export default Main
