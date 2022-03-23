"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
// 1)Повторіть всі ендпоінти як в мене
// 2)Створіть міграцію для таблиці comments, яка буде мати такі поля
// (id, text, authorId, postId, like, dislike, createdAt,deletedAt),
// відповідно звязок з таблицею юзерс і постс
// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив
// 4)update /posts/userId можна оновити текст про пост
// 5)get comments/userId вивести коментарі які належать юзеру який їх написав і пости в яких вони
// написані (якщо через квері почитаєте як там зробити мulti select)
// *6) update /comments/action написати ендпоінт який буде приймати в body commentId,
// action(like, dislike) і оновлювати в бд інформацію про кількість лайків і дизлайків в коментарі
const user_1 = require("./entity/user");
const post_1 = require("./entity/post");
const comment_1 = require("./entity/comment");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
    try {
        const users = await (0, typeorm_1.getManager)().getRepository(user_1.User).find({ relations: ['posts'] });
        // const users = await getManager().getRepository(User).findOne();
        res.json(users);
        console.log(users);
    }
    catch (e) {
        console.log(e);
    }
    // const users = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .leftJoin('Posts', 'posts', 'posts.userId=user.id')
    //     .where('posts.text="asd"')
    //     .getMany();
    // res.json(users);
    // const users = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .where('user.firstName="Olena"')
    //     .getManyAndCount();//.getManyAndCount() - кол-во таких user
    // res.json(users);
});
app.post('/users', async (req, res) => {
    try {
        const createdUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
        res.json(createdUser);
    }
    catch (e) {
        console.log(e);
    }
});
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const updateUser = await (0, typeorm_1.getManager)().getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(updateUser);
});
// app.delete('/users/:id', async (req, res) => {
//     const deleteUser = await getManager().getRepository(User)
//         .delete({ id: Number(req.params.id) });
//     res.json(deleteUser);
// });
app.delete('/users/:id', async (req, res) => {
    const deleteUser = await (0, typeorm_1.getManager)().getRepository(user_1.User)
        .softDelete({ id: Number(req.params.id) });
    res.json(deleteUser);
});
app.get('/posts', async (req, res) => {
    try {
        const posts = await (0, typeorm_1.getManager)().getRepository(post_1.Post).find();
        res.json(posts);
    }
    catch (e) {
        console.log(e);
    }
});
// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив
app.get('/posts/:userId', async (req, res) => {
    try {
        const posts = await (0, typeorm_1.getManager)().getRepository(post_1.Post)
            .find({ userId: Number(req.params.userId) });
        res.json(posts);
    }
    catch (e) {
        console.log(e);
    }
});
// app.get('/posts/:userId', async (req: Request, res: Response) => {
//     try {
//         const user = await getManager().getRepository(Post)
//             .createQueryBuilder('post')
//             .where('post.userId = :id', { id: +req.params['userId'] })
//             .leftJoin('Users', 'users', 'users.id = post.userId')
//             .getMany();
//         res.json(user);
//     } catch (e) {
//         console.log(e);
//     }
// });
// 4)update /posts/userId можна оновити текст про пост
app.patch('/posts/:id', async (req, res) => {
    const { text } = req.body;
    const updateUser = await (0, typeorm_1.getManager)().getRepository(post_1.Post).update({ id: Number(req.params.id) }, {
        text,
    });
    res.json(updateUser);
});
// 5)get comments/userId вивести коментарі які належать юзеру який їх написав і пости в яких вони
// написані (якщо через квері почитаєте як там зробити мulti select)
app.get('/comments', async (req, res) => {
    try {
        const comments = await (0, typeorm_1.getManager)().getRepository(comment_1.Comment).find();
        res.json(comments);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/comments/:userId', async (req, res) => {
    try {
        const comments = await (0, typeorm_1.getManager)().getRepository(comment_1.Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: Number(req.params['userId']) })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        res.json(comments);
    }
    catch (e) {
        console.log(e);
    }
});
// *6) update /comments/action написати ендпоінт який буде приймати в body commentId,
// action(like, dislike) і оновлювати в бд інформацію про кількість лайків і дизлайків в коментарі
app.patch('/comments/action', async (req, res) => {
    try {
        const { action, commentId } = req.body;
        const queryRunner = (0, typeorm_1.getManager)().getRepository(comment_1.Comment);
        const comment = await queryRunner.createQueryBuilder('comment')
            .where('comment.id = :id', { id: commentId })
            .getOne();
        if (!comment) {
            throw new Error('wrong comment ID');
        }
        if (action === 'like') {
            await queryRunner.update({ id: commentId }, { like: comment.like + 1 });
        }
        if (action === 'dislike') {
            await queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
        }
        res.sendStatus(201);
    }
    catch (e) {
        console.log(e);
    }
});
app.listen(5500, async () => {
    console.log('Serves has started on PORT: http://localhost:5500');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
});
//# sourceMappingURL=app.js.map