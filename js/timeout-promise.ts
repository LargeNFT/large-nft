
function timeout(value:number) : any {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) : any {
        const originalMethod = descriptor.value

        descriptor.value = async function(...args: any[]) {
            let promise = args ? originalMethod.apply(this, args) : originalMethod.call()
            const result = await timeout_fn(value, promise)
            return result
        }

        return descriptor
    }
}


const timeout_fn = function (ms:number, promise) {
    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject('Timed out in ' + ms + 'ms.')
        }, ms)
    })

    // Returns a race between our timeout and the passed in promise
    return Promise.race([
        promise,
        timeout
    ])
}

export {
    timeout,
    timeout_fn
}