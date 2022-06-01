import { injectable } from "inversify"
import { SVG } from '@svgdotjs/svg.js'


@injectable()
class SvgService {

    constructor() {}

    async fromText(text:string) : Promise<string> {

        let start = `<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' class='social-image' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' style='background: rgb(254, 242, 241); color: rgb(15, 2, 0);'>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
    
          .social-image {   
            width: 100%;
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
            border: 5px solid #4e82b1;
          }

          .social-image h1 {
            text-align: left;
            font-size: 70px;
            margin: 70px;
            line-height: 95px;
            height: 100%;
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