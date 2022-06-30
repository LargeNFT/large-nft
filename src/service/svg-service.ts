import { injectable } from "inversify"


@injectable()
class SvgService {

    constructor() {}

    async fromText(title:string, text:string, individualCss?:string, themeCss?:string) : Promise<string> {

        let fontSize = "140px"
        let lineHeight = "160px"


        if (title) {
            text = `<span class='svg-title'>${title}</span><br /><br /><span class='svg-text'>${text}</span>`
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


        // console.log(`Theme CSS: ${themeCss}`)
        // console.log(`Individual CSS: ${individualCss}`)


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


                .svg-h1 {

                    border: 5px solid rgb(78,130,177);
                    
                    background: linear-gradient(-45deg, rgb(204,204,204), rgb(239,243,248), rgb(176,199,220), rgb(255,255,255) );
                    background-size: 400% 400%;
                    animation: gradient 15s ease infinite;

                    text-align: center;
                    font-size: ${fontSize};
                    padding: 70px;            
                    line-height: var(--lh);
                    height: 1200px;
                    width: 1200px;  
                    -webkit-mask-image: linear-gradient(180deg, rgb(0,0,0) 60%, transparent);        
                }

                .svg-title {
                    font-weight: 700;
                    font-size: 1.25em;
                }

                .svg-text {
                    width: 100%;
                    font-weight: 500;
                }

                ${themeCss ? themeCss : ''}

                ${individualCss ? individualCss : ''}

            </style>
            <g>
                <foreignObject x='0' y='0' width='1200' height='1200'>
                    <h1 class="svg-h1" xmlns='http://www.w3.org/1999/xhtml'>${text}</h1>
                </foreignObject>
            </g>
        </svg>`


        return start
    }

}

export {
    SvgService
}