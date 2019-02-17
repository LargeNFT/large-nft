//This is a temporary place to put functions that deal with Template7 templates to go until
//we figure out where they should go for real
import {Template7} from 'framework7/js/framework7.bundle'

class TemplateService {

  postTemplate: any
  queueTemplate: any

  getPostTemplate() {
    if (!this.postTemplate) {
      this.postTemplate = Template7.compile(this.getPostTemplateText())
    }

    return this.postTemplate
  }

  getPostTemplateText() {
    return `
       <li>
          <a href="/post/show/{{id}}" class="item-link item-content">
            <div class="item-media">
              {{#if coverPhoto}}
              <img src="{{@global.ipfsGateway}}/{{coverPhoto}}" class="cover-photo-thumbnail" />
              {{else}}
              <i class="f7-icons">document_text</i>
              {{/if}}
            </div>
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title">{{title}}</div>
              </div>
              
              {{#if subtitle}}
              <div class="item-subtitle">{{subtitle}}</div>
              {{/if}}
              
              {{#if author}}
              <div class="item-author">
              
                {{author.name}} 
                                
              </div>
              {{/if}} 
              
              {{#if dateCreated}}
                <div class="item-date">
                  {{shortDate dateCreated}}
                </div>
              {{/if}} 
              
            </div>
          </a>
      </li>
      `
  }


  // getQueueTemplate() {
  //   if (!this.queueTemplate) {
  //     this.queueTemplate = Template7.compile(this.getPostTemplateText())
  //   }

  //   return this.queueTemplate
  // }

  getQueueTemplateText() {
    return `
      <li>
        <div class="item-media"></div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title">{{title}}</div>
          </div>
        </div>
      </li>
    `
  }



}



export { TemplateService }

