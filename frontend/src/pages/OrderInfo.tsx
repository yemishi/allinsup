import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { axiosRequest } from '../components'
import { divList, parseAlt, parseLocalCurrency, parseToNumber } from '../utils';

export default function OrderInfo() {
    const navigate = useNavigate()
    const [allowProduct, setAllowProduct] = useState<boolean>(false)
    const { orderId } = useParams();

    const variant = {
        open: { y: 0, opacity: 1, height: "auto" },
        closed: { y: '-100vh', opacity: 0, height: "1px" }
    }

    const { data, error } = useQuery('orderInfo', async () => {
        const response = await axiosRequest.orderInfo(orderId || "")
        return response.data
    }, {

        retry: 1,
        retryDelay: 500,
    });


    if (error) return setTimeout(() => navigate('/'), 500)

    if (!data) return <p className='text-center text-white font-bold'>Onde estou ?</p>

    const { price, products, purchaseDate, status, extra } = data
    const { paymentMethod } = extra
    const statusIcon = {
        Encomendado: <svg viewBox="0 0 24 24" className='fill-orange-200 stroke-slate-900 w-9 h-9' xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <defs>  </defs> <g id="reciept"> <line x1="8.18" y1="9.16" x2="12.95" y2="9.16"></line> <line x1="8.18" y1="12.98" x2="12.95" y2="12.98"></line> <line x1="8.18" y1="16.8" x2="12.95" y2="16.8"></line> <path d="M19.64,22.52H4.36A2.86,2.86,0,0,1,1.5,19.66V2.48L4,4.39,6.59,2.48,9.13,4.39l2.55-1.91,2.54,1.91,2.55-1.91V19.66a2.87,2.87,0,0,0,2.87,2.86Z"></path> <line x1="4.36" y1="9.16" x2="6.27" y2="9.16"></line> <line x1="4.36" y1="12.98" x2="6.27" y2="12.98"></line> <line x1="4.36" y1="16.8" x2="6.27" y2="16.8"></line> <path d="M18.68,10.11H22.5v9.55a2.87,2.87,0,0,1-5.73,0V10.11h1.91Z"></path> </g> </g>
        </svg>,
        Pago: <svg className='w-9 h-9' version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            fill="#000000"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <rect x="76.988" y="15.272" style={{ fill: '#CFF09E' }} width="358.002" height="120.448"></rect>
                <g>
                    <path
                        style={{ fill: '#507C5C' }}
                        d="M435.005,0H76.995C68.56,0,61.723,6.839,61.723,15.272v452.691c0,13.834,8.258,26.191,21.038,31.484 c12.78,5.29,27.356,2.393,37.137-7.389c4.296-4.296,10.01-6.663,16.086-6.663c6.077,0,11.79,2.367,16.086,6.663 C165.365,505.353,182.827,512,200.291,512s34.927-6.647,48.221-19.941c5.964-5.964,5.964-15.634,0-21.6 c-5.964-5.962-15.634-5.962-21.6,0c-14.678,14.678-38.564,14.678-53.243,0c-20.78-20.778-54.591-20.78-75.371,0.002 c-1.11,1.106-2.407,1.364-3.85,0.765c-1.448-0.6-2.181-1.697-2.181-3.264V150.991h327.464v316.972c0,1.565-0.733,2.664-2.181,3.264 c-1.449,0.599-2.741,0.344-3.85-0.767c-20.778-20.777-54.59-20.778-75.371,0l-12.096,12.096c-5.964,5.964-5.964,15.634,0,21.6 c5.964,5.962,15.634,5.962,21.6,0l12.096-12.096c4.296-4.296,10.01-6.663,16.086-6.663c6.077,0,11.789,2.367,16.086,6.663 c9.782,9.782,24.361,12.682,37.138,7.387c12.778-5.293,21.036-17.652,21.036-31.483V15.272C450.277,6.839,443.44,0,435.005,0z M92.268,120.446V30.545h327.464v89.901L92.268,120.446L92.268,120.446z"
                    ></path>
                    <path
                        style={{ fill: '#507C5C' }}
                        d="M373.44,272.152h-84.516c-8.435,0-15.272-6.839-15.272-15.272c0-8.433,6.837-15.272,15.272-15.272 h84.516c8.435,0,15.272,6.839,15.272,15.272C388.712,265.313,381.875,272.152,373.44,272.152z"
                    ></path>
                    <path
                        style={{ fill: '#507C5C' }}
                        d="M373.44,356.151h-84.516c-8.435,0-15.272-6.839-15.272-15.272c0-8.433,6.837-15.272,15.272-15.272 h84.516c8.435,0,15.272,6.839,15.272,15.272C388.712,349.312,381.875,356.151,373.44,356.151z"
                    ></path>
                    <path
                        style={{ fill: '#507C5C' }}
                        d="M227.402,293.462c-5.636-3.898-15.158-7.76-29.044-11.772v-38.471 c4.412,1.119,7.739,3.517,10.078,7.227c1.86,3.027,3.006,6.656,3.404,10.785c0.266,2.74,2.569,4.831,5.321,4.831h17.336 c1.442,0,2.822-0.582,3.829-1.616c1.006-1.032,1.553-2.427,1.515-3.869c-0.327-12.607-4.599-22.994-12.698-30.873 c-6.976-6.781-16.642-11.021-28.784-12.633v-8.239c0-2.952-2.393-5.345-5.345-5.345h-9.48c-2.952,0-5.345,2.393-5.345,5.345v8.189 c-12.342,1.139-22.331,5.784-29.748,13.844c-8.287,9.021-12.488,19.416-12.488,30.893c0,12.858,4.056,23.106,12.029,30.433 c6.773,6.315,16.922,11.042,30.206,14.081v43.803c-6.245-1.474-10.547-4.463-13.07-9.053c-1.338-2.448-3.07-7.499-3.72-17.66 c-0.18-2.815-2.514-5.003-5.335-5.003h-17.504c-2.952,0-5.345,2.393-5.345,5.345c0,12.571,2.05,22.319,6.251,29.778 c7.216,12.962,20.23,20.633,38.723,22.84v12.604c0,2.952,2.393,5.345,5.345,5.345h9.48c2.952,0,5.345-2.393,5.345-5.345v-12.791 c10.523-1.591,18.947-4.392,25.103-8.354c13.165-8.528,19.785-22.733,19.677-42.187 C243.138,311.508,237.845,300.698,227.402,293.462z M164.537,260.618c0-4.29,1.489-8.388,4.534-12.507 c1.903-2.54,4.957-4.264,9.118-5.151v33.874c-3.549-1.258-6.531-2.883-8.896-4.849 C166.048,269.235,164.537,265.625,164.537,260.618z M198.358,311.528c4.993,1.743,7.752,3.248,9.263,4.318 c4.731,3.352,6.935,7.984,6.935,14.575c0,4.325-0.892,8.039-2.734,11.366c-2.642,4.805-7.073,7.778-13.463,9.008v-39.265H198.358z"
                    ></path>
                </g>
            </g>
        </svg>,
        "Preparando o produto": <svg
            className='w-9 h-9'
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 511.997 511.997"
            xmlSpace="preserve"
            fill="#5f4307"
            stroke="#5f4307"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <polygon style={{ fill: '#a98342' }} points="372.706,190.761 255.992,503.902 36.679,380.244 36.679,132.907 "></polygon>
                <polygon style={{ fill: '#cb9743' }} points="255.999,9.249 36.686,132.907 255.999,256.576 255.999,503.902 475.311,380.244 475.311,132.907 "></polygon>
                <polygon style={{ fill: '#daa034' }} points="256.031,256.563 256.031,503.889 475.343,380.232 475.343,132.894 "></polygon>
                <g>
                    <path style={{ fill: '#949494' }} d="M128.217,340.924l-78.274,78.285c-7.778,7.778-7.789,20.398,0,28.187 c7.789,7.789,20.409,7.778,28.187,0l78.285-78.274"></path>
                    <circle style={{ fill: '#949494' }} cx="217.821" cy="279.523" r="108.61"></circle>
                </g>
                <circle style={{ fill: '#CEE5F2' }} cx="217.821" cy="279.523" r="76.806"></circle>
                <path d="M217.824,364.368c21.886,0,43.775-8.33,60.437-24.993c16.142-16.144,25.033-37.607,25.033-60.436 s-8.891-44.294-25.033-60.436c-33.325-33.325-87.549-33.325-120.874,0c-3.385,3.385-3.385,8.873,0,12.257 c3.386,3.385,8.873,3.385,12.258,0c12.868-12.868,29.978-19.956,48.178-19.956s35.311,7.088,48.178,19.956 c12.87,12.868,19.957,29.978,19.957,48.178c0,18.2-7.088,35.309-19.957,48.179c-13.283,13.284-30.728,19.926-48.178,19.924 c-17.446-0.001-34.897-6.643-48.178-19.924c-19.408-19.408-25.284-48.385-14.968-73.822c1.799-4.435-0.339-9.49-4.775-11.29 c-4.434-1.801-9.492,0.339-11.29,4.775c-12.938,31.906-5.568,68.252,18.774,92.595C174.05,356.038,195.937,364.368,217.824,364.368z "></path>
                <path d="M251.235,278.939c0,4.787,3.88,8.668,8.668,8.668c4.788,0,8.668-3.881,8.668-8.668c0-27.981-22.764-50.746-50.746-50.746 c-4.788,0-8.668,3.881-8.668,8.668s3.88,8.668,8.668,8.668C236.247,245.528,251.235,260.516,251.235,278.939z"></path>
                <path d="M479.569,124.787L260.256,1.118c-2.643-1.491-5.873-1.491-8.514,0L32.43,124.787c-2.725,1.536-4.41,4.422-4.41,7.549l0,0 v247.326c0,3.128,1.686,6.014,4.41,7.55l23.451,13.222l-12.065,12.068c-5.4,5.399-8.375,12.58-8.377,20.216 c-0.002,7.641,2.972,14.826,8.376,20.229c5.576,5.576,12.897,8.364,20.222,8.362c7.322,0,14.648-2.789,20.222-8.362l23.352-23.348 l144.134,81.281c1.321,0.745,2.789,1.118,4.258,1.118s2.937-0.372,4.258-1.118l148.753-83.881c4.17-2.351,5.644-7.637,3.294-11.808 c-2.351-4.17-7.638-5.644-11.808-3.293L264.67,488.491v-79.945c0-4.787-3.88-8.668-8.668-8.668c-4.788,0-8.668,3.881-8.668,8.668 v79.945l-126.997-71.616l37.284-37.279c18.465,11.041,39.333,16.569,60.205,16.569c30.034,0,60.067-11.432,82.932-34.297 c45.727-45.728,45.727-120.134,0-165.863c-45.73-45.729-120.134-45.729-165.864,0c-22.151,22.152-34.351,51.604-34.351,82.931 c0,21.555,5.776,42.22,16.594,60.233l-48.53,48.538l-23.251-13.11V147.172l77.001,43.412c4.17,2.35,9.456,0.876,11.808-3.294 c2.351-4.17,0.877-9.456-3.294-11.806l-76.538-43.148L256,18.619l201.665,113.718l-127.916,72.128 c-4.17,2.352-5.644,7.638-3.294,11.808c1.592,2.824,4.531,4.412,7.558,4.412c1.441,0,2.904-0.361,4.249-1.119l128.38-72.391V374.6 l-32.429,18.287c-4.17,2.351-5.644,7.637-3.294,11.808c1.592,2.823,4.531,4.411,7.558,4.411c1.442,0,2.904-0.361,4.249-1.12 l36.839-20.774c2.725-1.536,4.41-4.422,4.41-7.55V132.336C483.979,129.209,482.294,126.323,479.569,124.787z M147.15,208.265 c19.486-19.487,45.076-29.227,70.673-29.227c25.592,0,51.192,9.745,70.673,29.227c38.969,38.969,38.969,102.378,0,141.347 c-38.968,38.969-102.379,38.969-141.347,0c-18.878-18.877-29.274-43.977-29.274-70.673S128.272,227.143,147.15,208.265z M134.892,361.869 c2.688,2.688,5.48,5.213,8.354,7.585l-71.245,71.235c-4.392,4.392-11.537,4.393-15.929,0 c-2.129-2.129-3.299-4.958-3.299-7.967c0.001-3.008,1.173-5.836,3.299-7.964l71.228-71.239 C129.683,356.404,132.213,359.19,134.892,361.869z"></path>
            </g>
        </svg>,
        Expedido: <svg
            className='w-11 h-11'
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512.001 512.001"
            xmlSpace="preserve"
            fill="#000000"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    style={{ fill: '#8CC1EA' }}
                    d="M376.929,356.771h-73.547l43.861-222.235h77.423c41.909,0,75.876,33.967,75.876,75.865v131.895c0,7.995-6.481,14.476-14.476,14.476H464.08"
                ></path>
                <polyline style={{ fill: '#F2CA7F' }} points="157.689,356.771 125.007,356.771 125.007,111.659 347.243,111.659 347.243,134.536 347.243,356.771 244.84,356.771 "></polyline>
                <circle style={{ fill: '#898686' }} cx="201.265" cy="356.767" r="43.576"></circle>
                <circle style={{ fill: '#EDEBEB' }} cx="201.265" cy="356.767" r="17.583"></circle>
                <circle style={{ fill: '#898686' }} cx="420.504" cy="356.767" r="43.576"></circle>
                <g>
                    <path style={{ fill: '#EDEBEB' }} d="M91.505,167.177H27.779c-3.31,0-5.992-2.682-5.992-5.992c0-3.31,2.682-5.992,5.992-5.992h63.726c3.31,0,5.992,2.682,5.992,5.992C97.497,164.495,94.815,167.177,91.505,167.177z"></path>
                    <path style={{ fill: '#EDEBEB' }} d="M96.952,281.558H38.673c-3.31,0-5.992-2.682-5.992-5.992s2.682-5.992,5.992-5.992h58.279c3.31,0,5.992,2.682,5.992,5.992S100.262,281.558,96.952,281.558z"></path>
                    <path style={{ fill: '#EDEBEB' }} d="M75.165,232.537H5.992c-3.31,0-5.992-2.682-5.992-5.992c0-3.31,2.682-5.992,5.992-5.992h69.173c3.31,0,5.992,2.682,5.992,5.992C81.156,229.855,78.474,232.537,75.165,232.537z"></path>
                    <path style={{ fill: '#EDEBEB' }} d="M75.165,346.918h-6.701c-3.31,0-5.992-2.682-5.992-5.992c0-3.31,2.682-5.992,5.992-5.992h6.701c3.31,0,5.992,2.682,5.992,5.992C81.156,344.236,78.474,346.918,75.165,346.918z"></path>
                    <path style={{ fill: '#EDEBEB' }} d="M41.229,346.918H5.992c-3.31,0-5.992-2.682-5.992-5.992c0-3.31,2.682-5.992,5.992-5.992h35.237c3.31,0,5.992,2.682,5.992,5.992C47.221,344.236,44.539,346.918,41.229,346.918z"></path>
                </g>
                <path style={{ fill: '#CEE5F2' }} d="M467.86,244.019v-33.619c0-23.811-19.377-43.183-43.194-43.183h-44.741v76.802H467.86z"></path>
                <path
                    style={{ fill: '#9E9A9A' }}
                    d="M201.265,343.877c7.121,0,12.894,5.773,12.894,12.894s-5.773,12.894-12.894,12.894c-7.121,0-12.894-5.773-12.894-12.894S194.143,343.877,201.265,343.877 M201.265,331.894c-13.718,0-24.877,11.16-24.877,24.877s11.16,24.877,24.877,24.877c13.718,0,24.877-11.16,24.877-24.877S214.982,331.894,201.265,331.894L201.265,331.894z"
                ></path>
                <circle style={{ fill: '#EDEBEB' }} cx="420.504" cy="356.767" r="17.583"></circle>
                <path
                    style={{ fill: '#9E9A9A' }}
                    d="M420.503,343.877c7.121,0,12.894,5.773,12.894,12.894s-5.773,12.894-12.894,12.894c-7.121,0-12.894-5.773-12.894-12.894S413.383,343.877,420.503,343.877 M420.503,331.894c-13.718,0-24.877,11.16-24.877,24.877s11.16,24.877,24.877,24.877c13.718,0,24.877-11.16,24.877-24.877S434.221,331.894,420.503,331.894L420.503,331.894z"
                ></path>
                <path
                    style={{ fill: '#FFFFFF' }}
                    d="M467.86,311.562c-4.512,0-8.17-3.658-8.17-8.17v-20.698c0-4.512,3.658-8.17,8.17-8.17c4.512,0,8.17,3.658,8.17,8.17v20.698C476.031,307.903,472.372,311.562,467.86,311.562z"
                ></path>
                <g>
                    <path style={{ fill: '#E0B76E' }} d="M171.309,293.335L171.309,293.335c-4.813,0-8.715-3.902-8.715-8.715V157.161c0-4.813,3.902-8.715,8.715-8.715l0,0c4.813,0,8.715,3.902,8.715,8.715V284.62C180.024,289.433,176.122,293.335,171.309,293.335z"></path>
                    <path style={{ fill: '#E0B76E' }} d="M236.125,293.335L236.125,293.335c-4.813,0-8.715-3.902-8.715-8.715V157.161c0-4.813,3.902-8.715,8.715-8.715l0,0c4.813,0,8.715,3.902,8.715,8.715V284.62C244.84,289.433,240.938,293.335,236.125,293.335z"></path>
                    <path style={{ fill: '#E0B76E' }} d="M300.943,293.335L300.943,293.335c-4.813,0-8.715-3.902-8.715-8.715V157.161c0-4.813,3.902-8.715,8.715-8.715l0,0c4.813,0,8.715,3.902,8.715,8.715V284.62C309.658,289.433,305.756,293.335,300.943,293.335z"></path>
                    <path style={{ fill: '#E0B76E' }} d="M503.83,343.992h-25.664c-4.512,0-8.17-3.658-8.17-8.17c0-4.512,3.658-8.17,8.17-8.17h25.665c4.512,0,8.17,3.658,8.17,8.17C512.001,340.333,508.342,343.992,503.83,343.992z"></path>
                    <path style={{ fill: '#E0B76E' }} d="M142.152,343.992h-25.664c-4.512,0-8.17-3.658-8.17-8.17c0-4.512,3.658-8.17,8.17-8.17h25.665c4.512,0,8.17,3.658,8.17,8.17C150.324,340.333,146.665,343.992,142.152,343.992z"></path>
                </g>
            </g>
        </svg>,
        Entregue: <svg
            className='w-10 h-10'
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            fill="#000000"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <polygon style={{ fill: '#E0B76E' }} points="350.45,258.595 256,512 78.524,411.932 78.524,211.778 "></polygon>
                <polygon style={{ fill: '#F2CA7F' }} points="256,111.71 78.524,211.778 256,311.855 256,512 433.476,411.932 433.476,211.778 "></polygon>
                <polygon style={{ fill: '#F4CE8F' }} points="256,311.855 433.476,211.778 256,111.71 78.524,211.778 "></polygon>
                <g>
                    <polyline style={{ fill: '#EDEBEB' }} points="313.605,225.066 361.369,251.998 361.369,452.591 328.499,471.113 328.499,270.533 328.499,270.521 280.734,243.588 "></polyline>
                    <polyline style={{ fill: '#EDEBEB' }} points="231.515,243.588 183.749,270.521 183.749,270.533 183.749,471.113 150.878,452.591 150.878,251.998 198.644,225.066 "></polyline>
                </g>
                <polygon style={{ fill: '#79B1D6' }} points="316.733,94.45 256,257.395 141.878,193.049 141.878,64.344 "></polygon>
                <polygon style={{ fill: '#8CC1EA' }} points="370.122,64.346 370.122,193.051 330.034,215.651 297.164,234.185 256.006,257.398 256.006,128.693 141.878,64.346 181.761,41.855 214.632,23.321 256.006,0 "></polygon>
                <polygon style={{ fill: '#9CD2F4' }} points="370.122,64.346 328.747,87.679 295.889,106.202 256.006,128.693 141.878,64.346 181.761,41.855 214.632,23.321 256.006,0 "></polygon>
                <polygon style={{ fill: '#79B1D6' }} points="330.034,88.401 330.034,215.651 297.164,234.185 297.164,106.923 295.889,106.202 181.761,41.855 214.632,23.321 328.747,87.679 "></polygon>
            </g>
        </svg>
    }

    const paymentMethods = {
        Pix: ["Encomendado", "Pago", "Preparando o produto", "Expedido", "Entregue"],
        default: ["Encomendado", "Preparando o produto", "Expedido", "Entregue"]
    };

    const getTrackingStage = (paymentMethod: "Dinheiro" | "Cartão de Crédito" | "Cartão de Débito" | "Pix") => {
        return paymentMethod === "Pix" ? paymentMethods[paymentMethod] : paymentMethods.default
    };
    const stages = getTrackingStage(paymentMethod)

    return (
        <div className='flex flex-col p-4 text-white gap-7'>
            <h1 className='font-anton text-xl ml-4  font-semibold'>Detalhe da compra</h1>

            <dl className="w-full flex flex-col gap-3 p-4 bg-primary-600 border-y text-gray-200 border-primary-200" >
                {divList("Encomenda N°:", String(orderId))}
                {divList("Data da compra:", purchaseDate)}
                {divList("Valor:", price)}
                {divList("Situação atual:", status)}
                {divList("Metodo de pagamento:", paymentMethod)}
            </dl>

            <div className='flex flex-col gap-7 after:h-[95%]  after:border after:absolute relative after:mt-2  after:ml-4 after:border-secondary-200  after:border-dashed   '>
                {stages.map((stage, index) => {
                    const currentIndex = stages.indexOf(status)

                    return <div key={`${stage}_${index}`} className='flex flex-row'>

                        <div className='flex font-medium  gap-2 items-center duration-300 w-full'>

                            <span className={`p-4 rounded-full duration-300 border-2 border-primary-400 z-10 ${currentIndex >= index ? "bg-secondary-200 border-secondary-200 shadow-lightOn" :
                                "bg-primary-600"} `} />
                            <p className={`self-center ${currentIndex >= index ? "text-secondary-200" : "text-gray-400"}`}>{stage}</p>
                        </div>
                        {statusIcon[stage as "Encomendado" | "Pago" | "Expedido" | "Entregue"]}
                    </div>

                })}
            </div>

            <div className='flex flex-col gap-2 overflow-hidden'>
                <div onClick={() => setAllowProduct(!allowProduct)} className='z-20 font-lato text-lg font-bold p-2 rounded-b-lg bg-primary-600 
                 w-full flex'>
                    <p>Produtos</p>
                    <svg fill="#ffffff" className={`w-7 h-7 ml-auto duration-500 ${allowProduct ? "rotate-180" : "fill-gray-600 stroke-gray-600 "}`} viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><title></title><path d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z"></path></g></svg>
                </div>

                <motion.div transition={{ type: "just" }} variants={variant} initial="closed" animate={allowProduct ? "open" : "closed"} className='flex flex-col gap-4'>
                    {products.map((product, index) => {
                        const { coverPhoto, name, productId, productQtd, productPrice } = product


                        return <div key={`${name}_${productId}_${index}`} className='flex gap-7 pb-7 border-b   border-primary-200'>


                            <div className=' w-2/6' >
                                <img src={coverPhoto} className='rounded-lg duration-300 object-contain h-28 p-1 w-full bg-white' alt={parseAlt(coverPhoto)} />
                            </div>

                            <div className='flex w-3/5 flex-col font-anton'>
                                <dl className='flex flex-col gap-2 '>
                                    <p className='font-semibold text-center text-md mb-6 text-gray-200'>{name}</p>
                                    {divList("Quantidade:", String(`${productQtd}x`), "justify-between px-6")}
                                    {divList("Total:", parseLocalCurrency(parseToNumber(productPrice) * productQtd), "justify-between px-6")}
                                </dl>
                            </div>

                        </div>
                    })}
                </motion.div>
            </div >
        </div >
    )
}