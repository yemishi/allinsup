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
        <div className="w-full h-full flex flex-col p-4 font-anton over">
            <div className="flex text-sm gap-2 items-center">
                <p>TOTAL ({totalAmount} items)</p>
                <p className="text-secondary-500 font-bold text-lg">{parseLocalCurrency(totalPrice)}</p>
            </div>

            {cart && cart.map((product) => {
                const { name, coverPhoto, price, promotion, amount } = product

                return <div key={`${product._id}_${name}_${price}`} className="flex gap-3 border-b border-zinc-700 py-6 pb-5">
                    <img className="w-32 h-32" src={coverPhoto} alt="" />

                    <div className="flex flex-col justify-between text-sm">
                        <p className="hover:text-secondary-500 duration-300">{name}</p>
                        <p>Qtd:{amount}</p>
                        <p className="text-secondary-500 font-bold text-lg">{parseLocalCurrency(promotion ? promotion : price)}</p>
                    </div>

                    <div className="ml-auto flex flex-col">

                        <button onClick={() => removeProduct(product)} className="w-8 ml-auto self-start cursor-pointer">
                            <svg style={{ strokeWidth: '15px' }} className="stroke-white hover:stroke-secondary-text-secondary-500 duration-300" viewBox="-23.04 -23.04 302.08 302.08" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"></path> </g></svg>
                        </button>

                        <span className="flex mt-auto border-gray-600 p-2 rounded-lg gap-2 border">

                            <button onClick={() => decrementAmount(product, 1)} className="w-6">
                                <svg className="stroke-white hover:stroke-secondary-text-secondary-500 duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" ></path> </g></svg>
                            </button>

                            <input onChange={(event) => updateProductAmount(product, parseInt(event.target.value) || 1)} min={1} inputMode="decimal" type="number" name="amountItem"
                                className="bg-transparent w-6 outline-none text-center placeholder:text-white" value={amount} placeholder={String(amount)} />

                            <button onClick={() => incrementAmount(product, 1)} className="w-6">
                                <svg className="stroke-white fill-white hover:stroke-secondary-text-secondary-500 hover:fill-secondary-text-secondary-500 duration-300" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M12.711 9.182a1.03 1.03 0 0 1-1.03 1.03H7.53v4.152a1.03 1.03 0 0 1-2.058 0v-4.152H1.318a1.03 1.03 0 1 1 0-2.059h4.153V4.001a1.03 1.03 0 0 1 2.058 0v4.152h4.153a1.03 1.03 0 0 1 1.029 1.03z"></path></g></svg>
                            </button>
                        </span>
                    </div>
                </div>
            })}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In corporis, necessitatibus eaque odio esse expedita ut quisquam sit, id aut, minus quidem modi ipsum illo? Adipisci, ducimus deserunt harum accusantium distinctio quo sunt iste saepe eveniet laboriosam repudiandae eum enim, vel itaque vero ipsa architecto excepturi labore eligendi ab quaerat tempora. Dolorum reiciendis commodi rem. Aliquid nobis nam id numquam aspernatur cumque ratione necessitatibus debitis magni porro sapiente quis soluta autem, omnis ea sunt. Vero minima accusantium reiciendis, quam, fuga nulla sunt nobis porro illo quia, maxime quo! Ducimus quidem minus deleniti repudiandae pariatur voluptates quos qui sunt rem animi! Ut cumque iusto iste, consequuntur nisi ex necessitatibus consequatur officia minima dolore quaerat ab, asperiores cupiditate commodi. Consequuntur labore beatae ducimus est nobis temporibus! Quas magnam obcaecati nam rerum! Quo consectetur eveniet id aperiam eos maiores nam pariatur asperiores sit harum obcaecati nobis ea, molestias culpa eaque quia nesciunt? Eveniet aliquid assumenda nam esse ipsam vero debitis excepturi quos aut porro, veniam ipsum voluptas optio qui quae commodi vitae dignissimos dolores quidem neque asperiores dicta dolore et. Eum dicta itaque quidem enim, facilis unde. Officia adipisci, nemo error illo magnam et earum vel excepturi ratione quas odit! Aliquid, corrupti porro. Excepturi labore, provident placeat dicta a iure illum! Assumenda laborum repudiandae modi cupiditate, sunt consectetur animi cum distinctio esse a molestias optio ab? Quis doloremque vel necessitatibus itaque magnam atque eos, est quasi doloribus cupiditate optio, sint architecto autem molestias eveniet hic blanditiis explicabo velit dignissimos quidem fugit sequi. Veniam sit sequi consequatur delectus harum odit, ea labore voluptas ut consequuntur similique repellat excepturi, architecto debitis odio dignissimos neque natus animi, inventore at dolore atque? Quaerat praesentium explicabo minima minus alias at corrupti, culpa molestiae beatae aspernatur dicta voluptates ea velit harum quis unde nulla sint hic quod iusto accusamus eveniet quisquam ut eligendi. Molestias alias facilis aperiam aut dolorem cum voluptatibus. Molestias corrupti quasi nam autem molestiae, eum accusantium qui fugit, deleniti ad illum accusamus! Ea, officiis reprehenderit magnam ullam harum adipisci cupiditate similique recusandae alias a optio deleniti dignissimos sed quisquam fuga reiciendis, molestias sint id aliquam pariatur asperiores odio? Consequatur similique consequuntur inventore commodi quam aut voluptatibus. Eligendi aliquam alias reprehenderit cupiditate incidunt. Mollitia fugiat labore officia facilis atque exercitationem, beatae aliquid, cum autem, illo sunt libero alias illum quidem laboriosam sint corporis facere error? Ipsa omnis iusto ea facilis unde aliquam est nihil dignissimos dolorem laboriosam impedit, quidem minima. Adipisci, vel ex harum, libero a commodi sequi alias rerum magni incidunt numquam dolorum fugit qui excepturi! Inventore quas doloribus, distinctio vitae perferendis, quisquam debitis, eos magni ad laboriosam aut doloremque unde nesciunt voluptatibus fugiat quo minus dignissimos mollitia cumque qui culpa itaque accusamus? Quia quo, amet neque libero repellendus et saepe, sunt eum porro repellat distinctio itaque fugiat deserunt veniam omnis at, ullam quaerat iure ratione nam nulla! Quaerat nisi ad excepturi. Optio perspiciatis omnis itaque dicta, modi totam amet hic ex excepturi fugit, doloremque vitae nam ad sequi perferendis? Qui facilis et, asperiores libero odit commodi nemo quisquam delectus repellat culpa cumque, consequatur maxime incidunt eveniet perferendis doloribus? Officiis autem maiores sapiente, cum enim labore vitae exercitationem repellat quo totam nostrum repellendus, in cumque, rem ducimus a aperiam excepturi? Ullam culpa doloremque non recusandae? Sint velit maxime voluptatibus adipisci excepturi nihil numquam. In, magni perferendis reiciendis quisquam qui facere non ipsam. Totam hic odit omnis neque, obcaecati minus incidunt perferendis numquam aspernatur alias ipsa odio sequi quo exercitationem quod modi itaque, enim quibusdam ad eveniet, nobis vel rerum cupiditate provident. Cupiditate aliquam illum similique ea blanditiis quia! Veniam sed beatae aspernatur odio itaque? Suscipit nam ea veniam recusandae voluptatem! Harum dolore itaque cumque a autem voluptatem impedit neque, inventore, eum incidunt aliquam error officiis veniam? Sint et est temporibus repellendus accusantium quasi sequi harum earum quam corrupti quibusdam maxime exercitationem optio, excepturi odit mollitia, unde totam, praesentium alias libero tempora id debitis! Aliquid exercitationem voluptate ipsum quas optio amet hic ipsa tempora recusandae delectus eos illum expedita quae facilis incidunt eius quasi, unde velit reprehenderit cum numquam. Iusto odio iste tenetur facilis fugit, temporibus voluptatem recusandae qui voluptatibus veritatis velit eveniet sint quisquam, vero cumque omnis molestias! Alias placeat voluptatum blanditiis provident incidunt accusamus ratione enim? Veniam explicabo dolorem quae sapiente, consequuntur perspiciatis ea reprehenderit tempora eius earum, reiciendis iusto quia distinctio officiis totam nostrum similique! Aliquam temporibus maxime, ea alias tempore, ratione recusandae odio quasi itaque natus veritatis autem esse tempora possimus officia? Necessitatibus placeat iste voluptatum beatae enim possimus? Officia iusto nesciunt laboriosam maiores animi magnam qui in repellendus, sapiente perferendis cum fuga minima mollitia delectus sequi, blanditiis dolorem expedita! Itaque, molestias fugit. Officiis doloremque rerum excepturi deleniti dicta praesentium maiores quibusdam officia veniam iusto, ut esse perspiciatis nihil vitae facere recusandae, molestias voluptas? Dolorem dolorum totam ipsum eum est ab fugiat ipsam.
            <div className="sticky bg-primary bottom-0 w-full flex justify-center items-center py-4 px-2">
                <button className="bg-secondary-600 cursor-pointer text-white font-lato py-4 px-6 text-sm font-semibold rounded-xl">FINALIZAR COMPRA</button>

            </div>
        </div>
    )
}