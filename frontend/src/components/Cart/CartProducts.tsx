import { useGlobalState } from "../../App"

export default function CartProducts() {
    const { cart, removeProduct, incrementAmount, decrementAmount, updateProductAmount } = useGlobalState()
    const totalPrice = cart.reduce((total, currentPrice) => {
        return total + ((currentPrice.promotion ? currentPrice.promotion : currentPrice.price) * currentPrice.amount)
    }, 0)

    const totalAmount = cart.reduce((total, currentItem) => {
        return total + currentItem.amount;
    }, 0);

    const parseLocalCurrency = (e: (number)) => e.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return (
        <div className="w-full h-full flex flex-col p-4 font-anton ">
            <div className="flex text-sm gap-2 items-center">
                <p>TOTAL ({totalAmount} items)</p>
                <p className="text-primary font-bold text-lg">{parseLocalCurrency(totalPrice)}</p>
            </div>

            {cart && cart.map((product) => {
                const { name, mainPhoto, price, promotion, amount } = product
                console.log(promotion)
                return <div key={product._id} className="flex gap-3 border-b border-zinc-700 py-6 pb-5">
                    <img className="w-32 h-32" onClick={() => console.log(product)} src={mainPhoto} alt="" />

                    <div className="flex flex-col justify-between text-sm">
                        <p className="hover:text-primary duration-300">{name}</p>
                        <p>Qtd:{amount}</p>
                        <p className="text-primary font-bold text-lg">{parseLocalCurrency(promotion ? promotion : price)}</p>
                    </div>

                    <div className="ml-auto flex flex-col">

                        <button onClick={() => removeProduct(product)} className="w-8 ml-auto self-start cursor-pointer">
                            <svg style={{ strokeWidth: '15px' }} className="stroke-white hover:stroke-primary duration-300" viewBox="-23.04 -23.04 302.08 302.08" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"></path> </g></svg>
                        </button>

                        <span className="flex mt-auto border-gray-600 p-2 rounded-lg gap-2 border">

                            <button onClick={() => decrementAmount(product, 1)} className="w-6">
                                <svg className="stroke-white hover:stroke-primary duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" ></path> </g></svg>
                            </button>

                            <input onChange={(event) => updateProductAmount(product, parseInt(event.target.value) || 1)} min={1} inputMode="decimal" type="number" name="amountItem"
                                className="bg-transparent w-6 outline-none text-center placeholder:text-white" value={amount} placeholder={String(amount)} />

                            <button onClick={() => incrementAmount(product, 1)} className="w-6">
                                <svg className="stroke-white fill-white hover:stroke-primary hover:fill-primary duration-300" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M12.711 9.182a1.03 1.03 0 0 1-1.03 1.03H7.53v4.152a1.03 1.03 0 0 1-2.058 0v-4.152H1.318a1.03 1.03 0 1 1 0-2.059h4.153V4.001a1.03 1.03 0 0 1 2.058 0v4.152h4.153a1.03 1.03 0 0 1 1.029 1.03z"></path></g></svg>
                            </button>
                        </span>
                    </div>
                </div>
            })}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo odio quidem maxime id, est voluptatem sint eaque omnis fuga! Sapiente soluta expedita magnam incidunt asperiores quod assumenda quasi voluptatem dolore rem fugiat maiores, numquam corporis voluptates vitae id dolores error officiis facilis veniam? Sint repellendus nobis suscipit, pariatur quam exercitationem, veritatis architecto, officiis modi sunt mollitia asperiores deserunt doloribus! Iure accusamus quo minus nostrum ea facilis quis commodi autem expedita laudantium aperiam dolorem sunt nulla voluptatum ad ut maiores molestias repudiandae omnis atque, sapiente deleniti explicabo. Facilis sunt, eum architecto dicta ipsum eligendi maxime, accusamus ipsam perferendis modi possimus fuga magni ut atque tempora odio suscipit vitae. Sapiente architecto, vitae officia in, aspernatur voluptatibus iusto autem quidem voluptates aliquam dolores et. Nostrum vel est aut nesciunt facere amet fugit, ex blanditiis voluptas dicta tempora corporis, a quis quam doloremque eveniet reprehenderit iusto beatae labore porro alias itaque magni repellendus maiores! Laudantium dolorem fugit molestiae itaque sequi cum asperiores eaque omnis doloremque magnam numquam minima iusto obcaecati eligendi, vitae eos nihil nobis incidunt. Suscipit laboriosam aperiam consequatur iste sed enim eaque, accusamus ab quis harum, inventore beatae corporis numquam. Cum veniam debitis totam mollitia natus sed hic dicta nihil quod impedit culpa obcaecati est architecto, iusto, omnis modi rem soluta aut earum nemo! Dolore adipisci sit soluta! Corporis ducimus perferendis sapiente fugit sed! Cupiditate, aperiam magnam reiciendis enim qui eos dolor totam sit dolorem, ullam, pariatur aut voluptas debitis est alias! Facilis dolorem tenetur laudantium iste, culpa fugit repellendus. Reiciendis, dicta beatae eaque recusandae quas fugiat! Quaerat temporibus provident quidem tempore pariatur soluta exercitationem, eius aliquam deserunt hic iste reprehenderit voluptatibus consectetur, obcaecati iure quod vitae nesciunt dolorum alias? Repellat, pariatur mollitia tempore placeat at cumque dicta veniam quia quibusdam sed natus, enim nemo ab voluptate unde, delectus consectetur culpa tenetur dignissimos. Debitis rerum quae perferendis sapiente sunt autem tempore natus quisquam deleniti ipsam minus doloribus consequatur, eaque, quis cumque cupiditate tenetur ea dignissimos, blanditiis a placeat consectetur? Hic rem dignissimos sit fugiat, id facilis quos ullam, mollitia tempora, quod in architecto repudiandae necessitatibus! Nisi iure nostrum, eaque doloribus qui architecto. Quidem excepturi nesciunt accusantium quis assumenda ipsa architecto aliquam, expedita eum, tenetur, ratione dolorem at! Veritatis laboriosam perspiciatis similique unde reiciendis amet aspernatur odit! Fugit, eveniet? Nihil magnam quam natus ducimus quibusdam! Numquam quisquam amet maiores! Ut ad, illum beatae dolorem, expedita debitis nobis officia consequuntur distinctio nulla asperiores. Reprehenderit veniam quisquam, eligendi molestias possimus praesentium ipsa dicta quod a harum. Vitae qui ratione vero eligendi voluptate ad earum explicabo! Vero, odio tenetur. Nihil quod illum dolorem et placeat eum, laboriosam tenetur reiciendis dolore quasi. Asperiores quaerat quidem beatae! At omnis ipsam consequuntur voluptates doloribus quo, ullam ipsum minima obcaecati nemo rem enim deserunt animi? Unde, reiciendis asperiores? Consequatur vero earum velit voluptatibus, tenetur ipsam! Eius ipsam possimus quam, dignissimos harum error ex, reiciendis nam amet quis aliquid, distinctio adipisci dolorem nemo minus iste. Asperiores expedita deleniti sed enim repellat architecto perferendis recusandae odio quisquam culpa. Ipsum quam dolorum, tenetur vero aliquam numquam adipisci harum omnis. Reprehenderit vel deleniti odio rem. Mollitia quis molestias praesentium, id voluptatibus cum facere consequatur aliquid illo labore facilis vero nesciunt explicabo suscipit. Blanditiis, animi quae? Nostrum perferendis culpa placeat eligendi ex magnam alias numquam, possimus, iusto voluptate eveniet atque exercitationem libero sint, obcaecati tenetur soluta repudiandae! Corporis rerum odit incidunt tempore illum dolores quisquam dignissimos totam omnis delectus? Itaque quas vel hic harum provident natus ea rerum! Ipsa nulla, magni aliquid reprehenderit expedita quidem ad rerum officiis asperiores deleniti dignissimos quas id. Voluptatibus suscipit veritatis fugiat. Animi nesciunt omnis assumenda nulla molestias vitae aperiam, quae consectetur nobis enim voluptates inventore! Culpa alias id, animi impedit eius aliquid cumque placeat ex deserunt voluptatibus est numquam perspiciatis optio autem odit reprehenderit dolorum obcaecati? Quod illo nisi, molestiae velit asperiores iusto assumenda doloribus. Atque, sequi sint saepe fugit tenetur quod qui minima. Saepe beatae, eaque culpa distinctio soluta sed qui aperiam rem libero, blanditiis laboriosam non cupiditate laudantium nihil at quas excepturi minima, consequuntur harum? Quia inventore dolores ab iure facilis! Minima, aspernatur fugiat minus id dignissimos accusamus autem nulla labore ad quibusdam aut cum tempore molestiae ipsam deserunt reprehenderit? Impedit suscipit nobis quis quo esse repellendus officia, magni nulla reiciendis modi! Explicabo iste ipsa, quam tempore minus vitae. Perspiciatis, a. Nemo porro iste accusantium, maiores quisquam quas illo tempora. Dolore maiores ipsam laborum nobis alias! Id at facere fuga rem animi voluptatibus laudantium eveniet totam iusto, repellat ex rerum iure saepe, sequi corporis numquam assumenda voluptatum dolorem necessitatibus, quidem cumque praesentium doloremque nobis. Commodi eaque sequi quis pariatur tempora recusandae tempore rerum cum vero. Numquam architecto consequuntur labore sequi harum, debitis cum officia! Suscipit, aliquid omnis. Ad voluptate sit quas autem at sint deserunt incidunt adipisci mollitia, consequuntur cupiditate voluptatum odit, corrupti libero impedit dolor? Porro!
            <div className="sticky bg-[#161616] bottom-0 w-full flex justify-center items-center py-4 px-2">
                <button className="bg-primary cursor-pointer text-white font-lato py-4 px-6 text-sm font-semibold rounded-xl">FINALIZAR COMPRA</button>

            </div>
        </div>
    )
}