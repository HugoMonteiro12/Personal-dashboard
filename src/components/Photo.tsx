// src/app/page.tsx
"use client"
import React, {useEffect, useState} from "react"

interface Photos {
    src: string
    alt: string
}

const photos: Photos[] = [
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczMMBNz05v2ilzKOFl6BQGG_sBj8pXe7aBH0GL3sZzgPQhFEMI9Q_o7pPYtD4uVqwViZIzDKeyEmW86s-wjVVs9_Gk28SGlGZ-hmEW72PU-K8N60AwvX=w1920-h1080",
        alt: "2024 Insta Recap Photo 1"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczNdfler9uwCNaVew7QFM5U_XJ2AQ687YWkTi5rr6A_1F2wwzpgIVhJ0oFDevGXJgt11KbT62Rc9Dj7I39bqMk7g9wkjvCZLBRjeCBqZD9uP8cRFhP3p=w1920-h1080",
        alt: "2024 Insta Recap Photo 2"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczNrABWTGDJ3o0p_sDEvOAGuFh9hye6jYioJXNB7wO0cmcvAOM8ItsAsvTiMYWssvark-27lDcqHB_DnMhMv4yPS6s15BuqQwUye5wg-hCRx-poDKWN1=w1920-h1080",
        alt: "2024 Insta Recap Photo 3"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczPHSCwCNVIZo5xbbFwM0sIH5uMX_OEg1pD8k0uUsIJBw9kKPMarT4S0X2CbIuKo-VvKhazi99FmCU9PxX7I5OBvS5PQxA7Rm4Q--q6397JkI04qAjhq=w1920-h1080",
        alt: "2024 Insta Recap Photo 4"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczOe9vj2kMichqIAZWv10rnNZu2ShEa1rG1w7t61TjtG_9Qm6WDz6ITP7FgyLZUmJtt0QMl8R1rPlA9wHxeyf42y2DuMRF-x_BQdDOu5K7pa2Bsaj2M7=w1920-h1080",
        alt: "2024 Insta Recap Photo 5"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczO4_ArL7i-_J26eGS_JriXrTUN7PdSo5IlvBC0pbOYmzcOcPHztt1qPA_cL7yer8Gk0w8TPY8s0XOUxC2Xxobc1CuwKpeWLfampXgRvt_aQJIYGlMuv=w1920-h1080",
        alt: "2024 Insta Recap Photo 6"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczP-hl1imcfLFQeA5L-2kbqcaQGWwl1spFgsLXv-vcRRnGH6m1nzeJP1kTHbwmcmjlvjBZ2RaUqKE01EWnPLszcYYuhdo8nbNCsdTVZa9dWAt-IkXBdH=w1920-h1080",
        alt: "2024 Insta Recap Photo 7"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczO1vDR6dzVIoUXFLA2gJOe7qgK22c-BcGYhmZVrslpZwOlw4ELxva3vLK38hJiX0cDNrS4tw-NDlcTUtiEHf3O0mOUjwn4j4FbWUid0kdNmqksLC6I0=w1920-h1080",
        alt: "2024 Insta Recap Photo 8"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczN6nZgw9xqANFKZOqHCW7r-AhX9FKJh6HXVmXjScE0Ht1RG-AtRCO75ka8WvtDqJjXwUhxdsaeB_kQC_u-jTwNz4czTOqnks8CacePrTWQRKkY-1Rno=w1920-h1080",
        alt: "2024 Insta Recap Photo 9"
    },
    /*{
        src: "https://lh3.googleusercontent.com/pw/AP1GczNYe_T4tst8D1nBh90mDN3Z_81LPDC_zPTFafd1oZiZPeR2raRdG8x2_SD4-LJW3WoWdwJGORBd6z5cWWz9wo5UtVVeJqVSfnOrrQ0xMRmMf0UGvpw=w1920-h1080",
        alt: "2024 Insta Recap Photo 10"
    },*/
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczNECeaqj9_otjJ4uK7B-FuP__W-o9P2IEGEor0IaFpOJuxxb2kQTgGgA4tKjm0g05H1xxT5p9EWZEBG_IN4BUgrkgtF4DgxjL8B2SSonwIQiaXfVUmK=w1920-h1080",
        alt: "2024 Insta Recap Photo 11"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczOkNENEXIPPtMMps2bgeHF4k_9cOATfs4rKnrns_QzlvW2vvNRukkqEdCA_6dNZ_kXZrrvjEakBAz9IjZySRz-hhHiYcD-LCP_JJyw4pZsoJOgQGht7=w1920-h1080",
        alt: "2024 Insta Recap Photo 12"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczMe1MUEYekn9Ahc_JiB9d6aUaD5o4rDxF0PUbKa2K3Yd_6QhzyaXbTMTl6cgmr3W-D01mF9iGsrxkY3DcqT0fUrj9bNKjom8pj-8lxVD5P5b_Mdlge0=w1920-h1080",
        alt: "2024 Insta Recap Photo 13"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczOWIxnBmM1x8DTIzCHKo6eDDXExPR5fVEz4wj97cphm1bT1De8W_x6AP-GwGadBDgdKsLF4cCmSlcpzguWyPv_5XGyBUBlcA67ecnvYMZ5wSLN7nYJY=w1920-h1080",
        alt: "2024 Insta Recap Photo 14"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczM3pEK3PIg52yqJqJqce-X8M8lXL1__hnSwXqmXSopnYezK-rItT0KMj3GyQKfQMojLLHpfXaMj232-JGAi-DnJTYBN-oaD6TTfaIjxQqi98kEwKPrC=w1920-h1080",
        alt: "2024 Insta Recap Photo 15"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczOZdDA8INgTHkVvOW427N-RUb_X_cNC1_HE2dBcLrCybDjS621DAhTX-yhhrMbmWpT-ufd1ttZl-qjcWEK_4WKofsxpoCYrnJjEcKN7asfMINi7LQUt=w1920-h1080",
        alt: "2024 Insta Recap Photo 16"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczNbBPJipbDBtSD5x_4bZritrel2L1jb6abvEONPJWOOVnR0CsR2B7OTCvEEG8Z402-d9Te_5bMXMlu3SJp4O51jPMHcYoNrmiuKzW-oUzuz53HR_c0s=w1920-h1080",
        alt: "2024 Insta Recap Photo 17"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczPPT5zmasoQiTDMPf8VarB993PWA2PKOjZRfoxqnFCZqYa5PIuoVLtXRBe8LAFIe9kTMchoOetHlyGGvMVqXkH52KB2jh0VlhS5v_wWgTnOBhmtf3sQ=w1920-h1080",
        alt: "2024 Insta Recap Photo 18"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczNNHz6ua9pBTIf0tmuUUiU8Cw4G2TS5mVdlksWJP6CEy-5tty5zCaqyX35cjq16Zru96znd_Ws26Pi84wKts_zZW9iGTiHGiCGUSHY4j2kQe2E29iI5=w1920-h1080",
        alt: "2024 Insta Recap Photo 19"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczMZITQXrXVDIe4BG7uaVz2Si9ag5gD4vlQa_zRv7xZRlbJj1XUAkhgfSylxT3EKw9DaNGS2b6yoomw4-fWINQcrXLkY1BFrXF3dVfw81kB7n61T23W2=w1920-h1080",
        alt: "2024 Insta Recap Photo 20"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczOzEVjJpUkw-UlKwdCth5DOzqEXZjlCYil7eW7PNGqIh8mIgR8b8ihQFeBk_47bbVX-D_pUQQQhGVBQTQ_dXJ7rKQwVEtjQJ4WSjjLSLAD1n36BsUA_=w1920-h1080",
        alt: "2024 Insta Recap Photo 21"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczNzpjVGjORpRcQUOYoPbLNKOrGjIky1SJ9itBg7YUKA57CHRlOzvQ4WtHCEgVedPrAgRgFzGlB5o--lYh18Sh77yNKccXVDHq8DhC9pDC_UN8ZqStA0=w1920-h1080",
        alt: "2024 Insta Recap Photo 22"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczN5Z-ZRkiGQFt-pnmRxnJODz9oHV4D9r5gmNe3yRdW6Lsr3k4jmNVVzov3FTTPWeTUuJ6VI-KofsJbcQrQ_5evo0etIFd9Fd0vm_Ps5tNnhKZQhZipS=w1920-h1080",
        alt: "2024 Insta Recap Photo 23"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczPbhSBS7UR4mCTKE9FxWVa0pFSwp2T9s9egnjo_kZSigcpM5kdt4XqRQJf7QIal814DRUlXU2M2H-IQ1tNrt_PcYHU6N9xBPOVT4TEF2T3XPzDS1EVz=w1920-h1080",
        alt: "2024 Insta Recap Photo 24"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczN4WpKLd3NqNv_sHGCLAG7jnIesHs78jUnnk6cRbn69Z72beLsBZvGeoMeaGCu8uroeI0yo51le-V4WIv7Agowp7SVRNy63ywUMVqfXPOap0lm5x_aY=w1920-h1080",
        alt: "2024 Insta Recap Photo 25"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczNu37oDoCJvU-DTq053tc696n6csRC-OENrhU15hXM9kG7KjK1st5gSCRjRzNQJsMDR2pH7B8IgWfWFe06_BvtnFZ56HLJBkFc-uvrSbYbnZWD9wA3J=w1920-h1080",
        alt: "2024 Insta Recap Photo 26"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczMue6MTYuJeFdXI_bkORj1Xl1ofEvgzBtRop3KQuQJagXVh7AeERQSNuLss4Tev0NaOoqDv_nvsd4OG4x5z4_12gkaz9dZwq7skoNDqR9Y6kLAS2PHY=w1920-h1080",
        alt: "2024 Insta Recap Photo 27"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczOPUx-S3Kt2lieiwrwbgNOTUf-p5aDzSr1QPKuMc-8JpwLOGV7ysyqA2ehM9EYIuNfM2sycR4BdHIufg4Kls19rO30iGRR7N5w1VzOwCFzpSzcl9TnI=w1920-h1080",
        alt: "2024 Insta Recap Photo 28"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczNHUsCcBPkZUOK2-Bbh_DVqbA-y0YzKl0Tz3Bvwb2mIW7xb7qPiGCOw8eJ1yNnfsLlWkXDPnNoUCMi2DK03DZaLKHfsq44cIhPWZI7wVyqxy7PlmBfu=w1920-h1080",
        alt: "2024 Insta Recap Photo 29"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczP4Za3hJFC9egUrfBobUL3OoedAcYMImE8IML8c10LiQa8URkx1CBu7GpUeXqleE9-c-lHd0pX-NW5i4yfWDfL6u-oovm3DRk3ndJFLvPkYcnAWnKXD=w1920-h1080",
        alt: "2024 Insta Recap Photo 30"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczPbZ66FuNiEZBKIzGGFbV8fKXRziejD_9V51GGUF9mfN9vqbpAZxOSQB9CL3jWYnZywo1z6uss3cxIg-e3R99Xtid2EmqrugTncdzokqRMm7_ZJEbg9=w1920-h1080",
        alt: "2024 Insta Recap Photo 31"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczMuGK75AnYydyhc3EOFKs2Ykig4Zp5eQRAJkQUlP0a4qJdMDQA6mlkkdBNax0EJLMMQWta7ynGwzQq5PFKiOjeraZEJ6bMQcasfZsd45mKVQFqBYf76=w1920-h1080",
        alt: "2024 Insta Recap Photo 32"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczPshJm33qQFsL4YA4_j24NlcyErYl-E-aAHqeMsqYPoyH06cbjDHijipE1gCpHOSrNK-d5qPghRi1HXYrqi1YYlo3AH1E0iKhSHr7l13wc-n-w3yhen=w1920-h1080",
        alt: "2024 Insta Recap Photo 33"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczOEfWjny46mVXQQW3y8JZYrTD5o4RCL8e2aRSHkjCaCqTvWhVpSkGBZn0fqRxv7U7QEig8vTrcjEVGcLJix0WanUStwFP_H6FUpqn5XwlBQQxZ7R9O2=w1920-h1080",
        alt: "2024 Insta Recap Photo 34"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczN49DH32RAfEOf7jgpteZ_xeRr-6PSUJ87rlEMHiU25wdM31yqOdVvTu7461ORDO21-kb2LWcgORCnBlLbECym4kQUcikSl_6n7ADVUZdHQW2X3d-Zi=w1920-h1080",
        alt: "2024 Insta Recap Photo 35"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczPQmLQeggzm_u4X1_ufPvqmB2yW_aB5hiioBFbgKeW2QeQZAEgP3ipAhEMC7vkLpmc4wVM2t9A7lXNiTM3il1M3K0VYuxEqAuw4wxR8AW6dAA0bk12Y=w1920-h1080",
        alt: "2024 Insta Recap Photo 36"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczMPDatBSb_dtCRNpb_C_vpFmyM7L908YR6vG-WuF1tJqnVFetWNik99LsddEp0YBJ-xcfCh5up9sWKyufsRXFxOBnZ8EenF_gdvPXZQ43sgQsEzTXg6=w1920-h1080",
        alt: "2024 Insta Recap Photo 37"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczNQji8tgGdoLN77DIcBPUpe35Lp7HMET6rJ50H7NgLz32QKn5wsS3N90UTHwbFpoxXtux2s0nzNEJsIPk8tRs5UpEzTeXzeek6oIZb0cOLn0KTIqLbm=w1920-h1080",
        alt: "2024 Insta Recap Photo 38"
    },
    {
        src: "https://lh3.googleusercontent.com/pw/AP1GczNjeogD1uY8epj6NfjZGy1kyO7HGA_LQZIl7v04fIL1na8uuX1rGF8NkT_NChUavyznGi4Xnc9lx4z0iaxpZi6rpob0INpnTCFMl8H07YNUXMAaRr9M=w1920-h1080",
        alt: "2024 Insta Recap Photo 39"
    }
];

export default function Photo() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="col-span-6 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-6">
                <div className="md:col-span-6 flex flex-col ">
                    <div className="relative h-[500px] flex items-center justify-center">
                        {photos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo.src}
                                alt={photo.alt}
                                className={`absolute w-full h-full object-contain transition-opacity duration-1000 ${
                                    index === currentIndex ? "opacity-100" : "opacity-0"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}