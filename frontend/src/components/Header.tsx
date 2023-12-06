import { motion, useMotionValue, useTransform } from "framer-motion"
import { ReactNode, useState, useRef } from "react"


export default function Header() {



    return (
        <header className="w-full px-8 py-3">

            <div className="flex justify-between w-full relative">

                <img className="absolute left-0 top-0" src="" alt="" />

                <button className="w-9 ">
                    <img src="/svgs/cart.svg" alt="" />
                </button>
                
                <div className="text-white text-center">

                    <h1 className="font-montserrat text-2xl leading-4 font-bold ">ALL IN</h1>
                    <p className="text-orange-400 font-anton m-1 font-semibold">SUPPLEMENTS</p>

                </div>

                <span className="flex items-center gap-2 ">

                    <button className="w-9">
                        <img src="/svgs/profile.svg" className="" alt="" />
                    </button>
                </span>

            </div>

            <div className="search_input_container ">
                <input type="text" className="search_input" placeholder="Escreva aqui o que esta procur..." />
            </div>

        </header >
    )
}