import { RoundedMenu, ChildrenType } from "."

export default function CollectionRounded() {
    const children: ChildrenType[] = [
        {
            name: 'Pão Coelho ',
            banner: "https://bgcyrlorngovjnovagkp.supabase.co/storage/v1/object/sign/test/vecteezy_ai-generative-rabbit-production-domestic-rabbit-european_24396281.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L3ZlY3RlZXp5X2FpLWdlbmVyYXRpdmUtcmFiYml0LXByb2R1Y3Rpb24tZG9tZXN0aWMtcmFiYml0LWV1cm9wZWFuXzI0Mzk2MjgxLnBuZyIsImlhdCI6MTcwMTg4NjgzNSwiZXhwIjoyMDE3MjQ2ODM1fQ.nDWncg3ArPEyC5dms12hfJPXIPu2yazQVNythQaczOk&t=2023-12-06T18%3A20%3A34.780Z"

        }, {
            name: 'Moda',
            banner: "https://bgcyrlorngovjnovagkp.supabase.co/storage/v1/object/sign/test/vecteezy_isolated-black-t-shirt-white-hanger_8847294.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L3ZlY3RlZXp5X2lzb2xhdGVkLWJsYWNrLXQtc2hpcnQtd2hpdGUtaGFuZ2VyXzg4NDcyOTQucG5nIiwiaWF0IjoxNzAxODg3MTU5LCJleHAiOjIwMTcyNDcxNTl9.dYb0TLVuPj0NQm6TDZCaZQP_wILLVYra-6zKGDl_Ijg&t=2023-12-06T18%3A25%3A59.568Z"

        }, {
            name: "Eletronicos",
            banner: "https://bgcyrlorngovjnovagkp.supabase.co/storage/v1/object/sign/test/vecteezy_smartphone-smartphone-png-smartphone-transparent_24596068.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L3ZlY3RlZXp5X3NtYXJ0cGhvbmUtc21hcnRwaG9uZS1wbmctc21hcnRwaG9uZS10cmFuc3BhcmVudF8yNDU5NjA2OC5wbmciLCJpYXQiOjE3MDE4ODcxODcsImV4cCI6MjAxNzI0NzE4N30.kqPVkbp--9dRH4ZJyJOn95oa5hjni6OyeKtDn4Y_M7M&t=2023-12-06T18%3A26%3A26.879Z"
        }, {
            name: "Aucustadores",
            banner: "https://bgcyrlorngovjnovagkp.supabase.co/storage/v1/object/sign/test/vecteezy_headphones-design-3d-rendering-for-product-mockup_17054078.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L3ZlY3RlZXp5X2hlYWRwaG9uZXMtZGVzaWduLTNkLXJlbmRlcmluZy1mb3ItcHJvZHVjdC1tb2NrdXBfMTcwNTQwNzgucG5nIiwiaWF0IjoxNzAxODg3MjIyLCJleHAiOjIwMTcyNDcyMjJ9.0gZVo-_4yJ6R43OTxPMZm1Tz1pzGJf6jJE9kzqjFtN4&t=2023-12-06T18%3A27%3A02.350Z"
        }, {
            name: "Belezura",
            banner: "https://bgcyrlorngovjnovagkp.supabase.co/storage/v1/object/sign/test/a.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L2EucG5nIiwiaWF0IjoxNzAxODg3MjQ5LCJleHAiOjIwMTcyNDcyNDl9.lubuHSR-l_VAD2tzukP38O5u-9Uy3w4B_iME3hLS21M&t=2023-12-06T18%3A27%3A29.148Z"
        }

    ]
    return <RoundedMenu>
        {children}
    </RoundedMenu >
}