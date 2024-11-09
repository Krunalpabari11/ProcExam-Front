'use client'
import Dropdownone from "./Dropdownone"
import Dropdowntwo from "./Dropdowntwo"

export default function DropDownOptions() {
    return (
        <div className="mx-auto max-w-4xl mt-24 pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
            <div className="grid sm:grid-cols-2  place-items-center flex justify-center">
                <div className=" ">
                    <Dropdownone />
                </div>
                <div className=" ">
                    <Dropdowntwo />
                </div>
            </div>
        </div>
    );
}
