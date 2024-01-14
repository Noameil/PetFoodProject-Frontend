

export default function Page({children, className = ""} :{children: React.ReactNode, className?:string}) {
    return <div className={`dark:bg-gray-900 flex pt-32 pb-32 min-h-screen min-w-screen justify-evenly ` + className}>
        {children}
    </div>
}