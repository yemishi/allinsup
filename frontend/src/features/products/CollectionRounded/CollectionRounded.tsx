import { RoundedSlider } from "../../../components"

interface ChildrenType {
    name: string,
    banner: string
}

export default function CollectionRounded() {
    const children: ChildrenType[] = [
        {
            name: 'Max Titanium',
            banner: "https://cdn.discordapp.com/attachments/914969778387570688/1185325386758893618/image.png?ex=658f334a&is=657cbe4a&hm=e4692c37d3327e69ae41bb5d1b19c50609e00133ce94fc9727ca058576957cca&"

        }, {
            name: 'Growth',
            banner: "https://cdn.discordapp.com/attachments/914969778387570688/1185324566411751525/image.png?ex=658f3286&is=657cbd86&hm=f1a14461f6a7be3cdcb21e4fcdd4170eb00b7d2317de6e52b1982cabd354bba4&"
        }, {
            name: "Probiotica",
            banner: "https://d3p2amk7tvag7f.cloudfront.net/brands/f4f4c95a54a8c65fd6af2f5cc166db42d214f2f3.png"
        }, {
            name: "Black Skull",
            banner: "https://cdn.discordapp.com/attachments/914969778387570688/1185324544358109274/image.png?ex=658f3281&is=657cbd81&hm=4b7c545c521d4e7836933177ff671110a36b4bee0d6dbb01dfa47e9880d8f03c&"
        }

    ]
    return <RoundedSlider>
        {children}
    </RoundedSlider >
}