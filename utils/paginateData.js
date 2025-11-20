import { paginate } from "mongoose-paginate-v2";

const paginateData = async (model, query = {}, reqQurey = {}, options = {}) => {
    const { page = 1, limit = 2, sort = '-createdAt' } = reqQurey

    const paginateOptions = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort,
        ...options
    }

    try {
        const result = await model.paginate(query, paginateOptions)

        return{
            data: result.docs,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            currentPage: result.page,
            counter: result.pagingCounter,
            limit: result.limit,
            totalDocs: result.totalDocs,
            totalPages: result.totalPages,
        }
    } catch (error) {
        console.log('Paginate Error : ', error.message)
    }
}

export default paginateData