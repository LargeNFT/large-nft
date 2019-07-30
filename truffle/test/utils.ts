class Utils {
    constructor() {

    }

    static getLogByEventName(eventName, logs) {

        if (!logs) return;

        var found;

        logs.forEach(function(log){

            if (log.event === eventName) {
                found = log;
            }
        });

        return found;
    }


    static logArgsToRecord(args) {
        return {
            eventType: args.eventType,
            orbitCid: args.orbitCid,
            owner: args.owner
        }

    }


    static parseEvent(result) {
        var log = this.getLogByEventName("ListingEvent", result.logs);
        return this.logArgsToRecord(log.args);
    }

}

export {Utils} ;