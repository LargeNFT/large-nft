function routeMap(value: string, showSpinner?:boolean) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!globalThis.mappedRoutes) globalThis.mappedRoutes = []

        globalThis.mappedRoutes.push({
            path: value,
            controllerClass: target.constructor,
            action: propertyKey,
            showSpinner: showSpinner
        })

    }
}

export {
    routeMap
}
