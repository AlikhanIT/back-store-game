const PostModel = require("../models/post-model.js");
const UserModel = require("../models/user-model.js");
const ApiError = require("../exceptions/api-error.js");

class PostService {
    create = async (title, text, price1, price2, price3, imageUrl, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }

        const post = await PostModel.create({
            title,
            text,
            price1,
            price2,
            price3,
            imageUrl,
            user
        })
        return post;
    }

    remove = async (id, userId) => {
        const post = await PostModel.findOne({_id: id});
        if (!post) {
            throw ApiError.BadRequest("Такого поста не существует");
        }

        const userIsAdmin = await UserModel.findById(userId);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }

        // if(userId !== String(post.user).split('"')[0]){
        //     throw ApiError.BadRequest("Это не ваш пост");
        // }

        post.deleteOne();
        return post;
    }

    edit = async (id, title, text, price1, price2, price3, imageUrl, userId) => {
        const post = await PostModel.findOne({_id: id});
        if (!post) {
            throw ApiError.BadRequest("Такого поста не существует");
        }

        const userIsAdmin = await UserModel.findById(userId);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор")
        }

        // if(userId !== String(post.user).split('"')[0]){
        //     throw ApiError.BadRequest("Это не ваш пост");
        // }

        await PostModel.updateOne({
            _id: id,
        }, {
            title,
            text,
            price,
            price2,
            price3,
            imageUrl,
        });

        return post;
    }

    getAllTitles = async () => {
        const post = await PostModel.find({}, {title:true});
        return post;
    }

    getAllPosts = async (sort, asc, page, limit) => {
        if (sort === "price") {
            const post = await PostModel.find().sort({price3: asc}).skip((page - 1) * limit).limit(limit);
            return post;
        } else if (sort === "title") {
            const post = await PostModel.find().sort({title: asc}).skip((page - 1) * limit).limit(limit);
            return post;
        } else {
            const post = await PostModel.find().sort({viewsCount: asc}).skip((page - 1) * limit).limit(limit);
            return post;
        }
    }

    getPostById = async (id) => {
        const post = await PostModel.findById(id);
        if (!post) {
            return ApiError.BadRequest("Такого поста не существует");
        }
        post.viewsCount += 1;
        await post.save();

        return post;
    }
}

module.exports = new PostService();