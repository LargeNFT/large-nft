import { injectable } from "inversify"


@injectable()
class SvgService {

    constructor() {}

    async fromText(text:string) : Promise<string> {

        let fontSize = "140px"
        let lineHeight = "160px"

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
                    margin: ${fontSize};            
                    line-height: ${lineHeight};
                }

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