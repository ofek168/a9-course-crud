import { ICourse,ICreator } from "interfaces"
import { sample, sample2 } from '@components/Samples'


export const coursesample : ICourse = {
name:"Spanish",
catalog: "1",
collections: [sample],
id:"123",
creator:[sample] as unknown as ICreator

}