/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-useless-catch */

module.exports = {
  users: async () => {
    try {
      return await User.find({}).exec();
    } catch (error) {
      throw error;
    }
  },

  //   createUser: async (args) => {
  //     try {
  //       const { title, body } = args.article;
  //       const article = new Article({
  //         title,
  //         body,
  //       });
  //       const newArticle = await article.save();
  //       return { ...newArticle._doc, _id: newArticle.id };
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
};
