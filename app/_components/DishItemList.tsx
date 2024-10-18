
const DishItemList = () => {

    return (<div className="text-center">
        <div className="text-3xl">Dish items on the menu</div>
        <div className="m-10 flex  justify-center">
            <table className="mx-auto">
                <thead>
                    <tr>
                        <td>S.No</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Pizza</td>
                        <td>300</td>
                        <td>Best in the town</td>
                        <td>Image</td>
                        <td><button>Delete</button><button>Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)
}

export default DishItemList;