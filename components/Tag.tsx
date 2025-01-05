import { Text } from "react-native"
import { Div } from "./Div"

export function SmallTag({value, customStyles} : {value: string, customStyles?: string}) {
    return (
        <Div className={`${customStyles} inline text-xs py-1 px-2 rounded-full bg-black`} >
            <Text className="text-white text-xs font-jo-md">{value}</Text>
        </Div>
    )
}

export function Tag({value}: {value: string}) {
    return (
        <Div className="inline py-1 px-2 rounded-full bg-black text-white" >
            <Text>{value}</Text>
        </Div>
    )
}
