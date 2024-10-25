import CustomerHeader from "@/app/_components/CustomerHeader"

const Page = (props: { params: { name: string; } }) => {
    const name = props.params.name

    return (<>
        <CustomerHeader />
        <div>
            <div className="main-div text-center">
                <h1 className=" text-5xl m-14 mt-[250px] ">{decodeURI(name)}</h1>
            </div>
        </div>
    </>)
}

export default Page;