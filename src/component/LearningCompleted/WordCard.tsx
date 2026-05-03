import { cn } from "../../utils/cn"

interface WordCardProps {
    content : string
    WordCardClassName? : string
}


const WordCard = ({ content, WordCardClassName } : WordCardProps) => {

    return(
        <div className={cn(`flex bg-primary-5 text-medium-15 text-primary-6 px-3 py-1 rounded-2xl `, WordCardClassName)}>
            {content}
        </div>
    )
}

export default WordCard