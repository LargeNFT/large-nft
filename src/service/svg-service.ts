import { injectable } from "inversify"


@injectable()
class SvgService {

    constructor() {}

    async fromText(title:string, text:string, css:string) : Promise<string> {

        let fontSize = "140px"
        let lineHeight = "160px"


        if (title) {
            text = `<span class='title'>${title}</span><br /><br /><span class='text'>${text}</span>`
        }


        if (text.length > 50 && text.length <= 100) {
            fontSize = "110px"
            lineHeight = "130px"
        }

        if (text.length > 100 && text.length <= 175) {
            fontSize = "90px"
            lineHeight = "110px"
        }

        if (text.length > 175) {
            fontSize = "75px"
            lineHeight = "95px"
        }

        let start = `<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' version='1.1'>
            <style>
                * {
                    --lh: ${lineHeight};
                    height:100%;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                }


                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    25% {
                        background-position: 50%% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    75% {
                        background-position: 50% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .container {
                    background: linear-gradient(-45deg, #cccccc, #eff3f8, #B0C7DC, #FFFFFF );
                    background-size: 400% 400%;
                    animation: gradient 15s ease infinite;
                    height: 100%;
                    width:100%;
                    border: 5px solid #4e82b1;
                }

                h1 {
                    text-align: center;
                    font-size: ${fontSize};
                    margin: 70px;            
                    line-height: var(--lh);
                    height: 1050px;
                    width: 1050px;  
                    -webkit-mask-image: linear-gradient(180deg, #000 60%, transparent);        
                }

                .title {
                    font-weight: 700;
                    font-size: 1.25em;
                }

                .text {
                    width: 100%;
                    font-weight: 500;
                }

                ${css}

            </style>
            <g>
                <foreignObject x='0' y='0' width='1200' height='1200' class="container">
                    <h1 xmlns='http://www.w3.org/1999/xhtml'>${text}</h1>
                </foreignObject>
            </g>
        </svg>`


        return start
    }

}

export {
    SvgService
}