import styles from './Icourse.module.scss'
import { ICollection, IVocab, ICourse } from 'interfaces'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MouseEvent } from 'react'
import { useRouter } from 'next/router'


interface Course_Props {
    courses: ICourse[]
}


const Courses = (course: ICourse) => {
    const router = useRouter()

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        localStorage.clear()
        const coursedata = {
            name: course.name,
            catalog: course.catalog,
            collections: course.collections,
            creator: course.creator
        }
        localStorage.setItem("course_state", JSON.stringify(coursedata))

        // router.push(`/add_collection?edit=true&collection=${col.id}`)
    }

    return (

        <div>
            <h2>{course.name} {course.catalog}</h2>
            <p>CID: {course.id}</p>
        </div>



    )
}

const InstructorCourse = ({ courses }: Course_Props) => {
    const router = useRouter()

    return (

        <ul>
            {courses.map(Courses)}
        </ul>

    )
}

export default InstructorCourse