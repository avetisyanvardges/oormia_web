import * as React from "react"

function MessageSvg(props) {
    return (
        <svg
            width={21}
            height={15}
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#clip0_299_150)">
                <path
                    d="M10.503 8.3L.365 1.057C.723.418 1.31 0 1.975 0h17.05c.666 0 1.255.419 1.612 1.06L10.503 8.3z"
                    fill="#B2C2B0"
                />
                <path
                    d="M21 2.723v9.763C21 13.875 20.116 15 19.025 15H1.975C.884 15 0 13.875 0 12.486V2.72l10.175 7.268.018.013.039.023a.46.46 0 00.08.037l.02.008a.133.133 0 00.022.007l.02.006a.578.578 0 00.192.012.57.57 0 00.064-.012l.02-.006a.131.131 0 00.022-.007l.02-.008a.637.637 0 00.061-.027c.007-.004.013-.008.02-.01L10.81 10l.013-.01.006-.003L21 2.723z"
                    fill="#B2C2B0"
                />
                <path d="M10.439 10.094zM10.567 10.094z" fill="#fff" />
            </g>
            <defs>
                <clipPath id="clip0_299_150">
                    <path fill="#fff" d="M0 0H21V15H0z" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default MessageSvg;
