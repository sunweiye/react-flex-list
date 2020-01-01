import PouchDB from 'pouchdb-core';
import MemoryAdapter from 'pouchdb-adapter-memory';
import FindPlugin from 'pouchdb-find';

import {PouchDBQuery} from "./pouchDBQuery";

PouchDB.plugin(FindPlugin);

class Repository {
    constructor(adapter = 'memory') {
        PouchDB.plugin(MemoryAdapter);
        this._persistence = new PouchDB('flex-list-db', {adapter});
    }

    async insertRows(rows = []) {
        return this._persistence.bulkDocs(rows);
    }

    async createIndex(fields = []) {
        return this._persistence.createIndex({
            index: {fields}
        });
    }

    async search(query = {}, withTotalCount = false) {
        let request = query instanceof PouchDBQuery ? query.getQueryRequest() : query;
        if(typeof request.selector !== 'object') {
            request.selector = {};
        }

        if(withTotalCount) {
            let {skip, limit, ...queryRequest} = request;
            return this._persistence.find(queryRequest).then(result => {
                skip = skip || 0;
                return {
                    total_rows: result.docs.length,
                    docs: result.docs.slice(skip, skip + limit)
                }
            });
        }
        return this._persistence.find(request);
    }
}

let repositoryInstance;

const getRepository = (adapter = 'memory') => {
    if(!repositoryInstance) {
        repositoryInstance = new Repository(adapter);
        Object.freeze(repositoryInstance);
    }
    return repositoryInstance;
};

export default getRepository;
