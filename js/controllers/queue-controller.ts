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

        this.queueService.setVirtualList(
            Global.app.virtualList.create({ 
                el: '#queue-list',
                items: this.queueService.currentQueue,
                itemTemplate: this.templateService.getQueueTemplateText()
            })
        )
        
    }

}

export {QueueController }