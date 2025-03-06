export default class BaseModel {
    findBy(filters, options = {}) {
      const query = this.client(this.tableName)
  
      query.where({ ...filters })
  
      if (options?.limit) {
        query.limit(options.limit)
      }
  
      if (options?.page) {
        const offset = --options.page * (options.limit || 10)
  
        query.offset(offset)
      }
  
      return query
    }
  
    findOneBy(filters, options = {}) {
      return this.findBy(filters, options).first()
    }
  
    // todo probably refactor to this.queryBuilder = this.client(this.tableName)
    createOne(data) {
      return this.client(this.tableName).insert({ ...data })
    }
  
    createMany(data) {
      if (!Array.isArray(data))
        throw new Error('Improper type: Should be of type array')
  
      return this.client(this.tableName).insert(data)
    }
  
    update(id, data) {
      return this.client(this.tableName)
        .where({ id })
        .update({ ...data })
    }
  
    async transactionWithDeadlock(cb) {
      let i = 0
      const retries = 5
      while (true) {
        try {
          return await this.client.transaction(cb)
        } catch (err) {
          if (i + 1 < retries && err?.code === 'ER_LOCK_DEADLOCK') {
            i++
            continue
          }
  
          throw err
        }
      }
    }
  }
  
 