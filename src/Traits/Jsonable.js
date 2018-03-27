class Jsonable {

    constructor () {
        this.fields = []
    }

    register (Model, options) {
        this.fields = (options.length > 0 ? options : null) || Model.prototype.jsonFields || []

        Model.addHook('beforeSave', this._beforeSave.bind(this))
        Model.addHook('afterSave', this._afterSave.bind(this))
        Model.addHook('afterFind', this._afterFind.bind(this))
        Model.addHook('afterFetch', this._afterFetch.bind(this))
    }

    _beforeSave (instance) {
        for (let field of this.fields) {
            if (instance[field]) {
                instance[field] = JSON.stringify(instance[field])
            }
        }
    }

    _afterSave (instance) {
        for (let field of this.fields) {
            if (instance[field]) {
                instance[field] = typeof instance[field] === 'string' ? JSON.parse(instance[field]) : instance[field]
            }
        }
    }

    _afterFind (instance) {
        for (let field of this.fields) {
            if (instance[field]) {
              instance[field] = typeof instance[field] === 'string' ? JSON.parse(instance[field]) : instance[field]
            }
        }
    }

    _afterFetch (instances) {
        for (let instance of instances) {
            for (let field of this.fields) {
                if (instance[field]) {
                  instance[field] = typeof instance[field] === 'string' ? JSON.parse(instance[field]) : instance[field]
                }
            }
        }
    }
}

module.exports = Jsonable
