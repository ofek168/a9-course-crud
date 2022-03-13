import React, { FC, InputHTMLAttributes } from 'react';
import styles from './createcourse.module.scss'
import Link from 'next/link'
import { sample, sample2, coursesample } from '@components/Samples'
import { ICollection } from 'interfaces'
import CollectionsList from '@components/CreatorView/CollectionsView/CollectionsList';
import router, { useRouter } from 'next/router'
import ViewCollection from '@components/CreatorView/ViewCollection';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}
const Main: FC<InputProps> = ({ name, label, ...rest }) => {
    return (
        <main>
            <h1>Create New Course</h1>
            <section>
                <h2>Quarter/Semester</h2>
                <select>
                    <option>Fall</option>
                    <option>Winter</option>
                    <option>Spring</option>
                </select>
            </section>


            <section>
                <h2>Year</h2>
                <select>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                </select>
            </section>
            <div>
                <label htmlFor={name}> Course Name:{label}</label>
                <input id={name} {...rest} className={styles.input} placeholder="Type Something..." ></input>
                <br></br>
                <label htmlFor={name}> Maximum Enrolled:{label}</label>
                <input id={name} {...rest} className={styles.input} placeholder="Type Something..." ></input>
                <br></br>
                <label htmlFor={name}> Class Time:{label}</label>
                <input id={name} {...rest} className={styles.input} placeholder="Type Something..." ></input>
                <br></br>
                <section>
                    Location: <select><option>In-Person</option><option>Zoom</option></select>
                </section>
                <label htmlFor={name}> Enter Location/Zoom Link Here:{label}</label>
                <input id={name} {...rest} className={styles.input} placeholder="Type Something..." ></input>
            </div>

            <div>
                My Collection
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

        </main>


    )
}

export default Main