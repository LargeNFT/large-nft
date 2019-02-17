import { QueueService, QueueItem } from "../services/queue_service";
import { ModelView } from "../model-view";
import { Global } from "../global";
import { TemplateService } from "../services/template-service";

class QueueController {

    

    constructor(
        private queueService: QueueService,
        private templateService: TemplateService
    ) {}

    async showQueue() : Promise<ModelView> {
        return new ModelView({}, 'pages/queue.html')
    }

    async initList() : Promise<void> {

        const items = []
        for (let i=0; i< 100; i++) {

            let item = new QueueItem(
                "1",
                "Saving story {title}",
                {
                    title: "The story Title"
                }
            )

            item.title = this.queueService._parseTitle(item.titleTemplate, item.context)
            
            console.log(item)

            items.push(item)

        }

        this.queueService.setVirtualList(
            Global.app.virtualList.create({ 
                el: '#queue-list',
                // items: this.queueService.currentQueue,
                items: items,
                itemTemplate: this.templateService.getQueueTemplateText()
            })
        )
        
    }

}

export {QueueController }