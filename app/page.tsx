import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="">

      <CustomerHeader />
      <div className="main-div text-center">
        <h1 className=" text-7xl m-14 ">Food Delivery App</h1>

        <div className="bg-white border rounded-lg py-2  text-xl w-[60%] m-auto">
          <input className="text-black h-6 p-5 border-r-[2px] w-[35 %] border-slate-400" type="text" placeholder="Search Location" />
          <input className="text-black mx-2 border-black w-[60%]" type="text" placeholder="Search Your Favourite Dish Items" />
        </div>
      </div>
      <Footer />

    </div>
  );
}
