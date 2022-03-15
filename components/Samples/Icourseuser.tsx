import { ICourse, ICreator } from "interfaces"
import { sample, sample2 } from '@components/Samples'


export const coursesample: ICourse = {
    name: "Spanish",
    catalog: "1-Intro to Spanish A01",
    collections: [sample],
    id: "123456789",
    creator:
    {
        collections: [sample],
        name: "test",
        email: {
            address: "test@email.com"
        },
        rank: 0,
        id: "123456789"
    }
}

export const coursesample2: ICourse = {
    name: "Spanish",
    catalog: "1-Intro to Spanish A02",
    collections: [sample2],
    id: "987654312",
    creator:
    {
        collections: [sample2],
        name: "test2",
        email: {
            address: "test2@email.com"
        },
        rank: 0,
        id: "987654312"
    }
}
//Conversion of type '{ sample: ICollection; sample2: ICollection; }' to type 'ICreator' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
//Type '{ sample: ICollection; sample2: ICollection; }' is missing the following properties from type 'ICreator': collections, name, email, rank, idts(2352)

