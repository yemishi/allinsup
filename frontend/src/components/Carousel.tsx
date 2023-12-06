import { SliderProps, Slide, Slider, axiosRequest, ProductType } from "./Components";
import { useState, useEffect, Suspense } from 'react'
import Card from './Card/Card'

import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
import image4 from "../assets/image4.jpg"
import image5 from "../assets/image5.png"
import image6 from '../assets/image6.png'
import image7 from "../assets/image7.png"
import image8 from "../assets/image8.png"
import image9 from "../assets/image9.png"
import image10 from "../assets/image10.png"
import image11 from "../assets/image11.png"


export default function Carousel() {

    interface ProductsResponse {
        data: ProductType[]
    }

    const [highlight, setHighlight] = useState<ProductType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: ProductsResponse = await axiosRequest.highlightProducts()
                setHighlight(response.data)


            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    const settings: SliderProps = {
        loop: true,
        style: {
            minHeight: 'inherit',
            objectFit: "cover",
            height: 'inherit'

        },
        draggable: false,

        autoplay: {
            delay: 4000,
            disableOnInteraction: true,
        },

        effect: 'fade'
    }

    const cardSettings: SliderProps = {
        spaceBetween: 20,
        freeMode: true,
        slidesPerView: "auto",
        style: {
            background: 'linear-gradient(transparent,#eeeeee)',
            position: 'absolute',
            height: "310px",
            width: '100%',
            bottom: 0,
            zIndex: 10
        }
    }

    const slides: string[] = [image7, image8, image9, image10, image11, "https://cdn.discordapp.com/attachments/914969778387570688/1181765888723124326/Design_sem_nome_10.png?ex=65824040&is=656fcb40&hm=41ab0d2df8d0f4f04033ec6a79a9a313ec495b1ddd4567205d35c30af3f3dd51&", "https://cdn.discordapp.com/attachments/914969778387570688/1181765423851638897/Design_sem_nome_9.png?ex=65823fd1&is=656fcad1&hm=a3b97507e9e093492d2af70f3d85ec894a35fcd9792e286019539c87f1d22728&"]

    const bannerMinH: object = { minHeight: '450px' }
    return (
        <div style={bannerMinH} className="relative w-full" >

            <Slider settings={settings}>

                {slides.map((e) => {
                    return <Slide key={e} className="bg-white">
                        <img src={e} alt="" style={bannerMinH} className={`w-full object-cover`} />
                    </Slide>
                })}
            </Slider>

            <Card settings={cardSettings}>
                {highlight}
            </Card>

        </div>
    )
}