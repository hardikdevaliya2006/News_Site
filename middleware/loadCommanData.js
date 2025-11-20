import categoriesModel from "../models/Category.model.js";
import newsModel from "../models/News.model.js";
import settingsModel from "../models/Settings.model.js"

const loadCommanData = async (req, res, next) => {
    try {
        const settings = await settingsModel.findOne()
        const latestNews = await newsModel.find().populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname').sort(({ createdAt: -1 })).limit(3)
        const ctategoriesInNews = await newsModel.distinct('category')
        const categories = await categoriesModel.find({ '_id': { $in: ctategoriesInNews } })
        
        res.locals.settings = settings
        res.locals.latestNews = latestNews
        res.locals.categories = categories

        next()
    } catch (error) {
        next(error)
    }
}

export default loadCommanData