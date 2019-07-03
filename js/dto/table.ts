
class Table {

    name: string
    path?: string 

    static get constraints() {
        return {
            name: { primary: true, unique:true, type: 'string' },
            path: { primary: false, unique:true, type: 'string' }
        }
    }
    
}


export {
    Table
}