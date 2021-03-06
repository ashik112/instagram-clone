const db = require('../models');

const { Op } = db.Sequelize;
const Post = db.posts;
const Like = db.likes;

// * Add like to a post
exports.create = async (req, res) => {
  let transaction;
  const { userId } = req.body;
  const { postId } = req.params;
  try {
    // get transaction
    // eslint-disable-next-line prefer-const
    transaction = await db.sequelize.transaction();
    const data = await Like.create({
      userId,
      postId: +postId,
    });
    data.dataValues.user = await data.getUser();
    // commit
    await transaction.commit();
    res.send(data);
  } catch (e) {
    if (transaction) await transaction.rollback();
    res.status(500).send({
      error: e,
      message:
        e.message || 'Some error occurred while liking the Post.',
    });
  }
};

// * Remove like
exports.delete = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const data = await Like.destroy({
      where: {
        [Op.and]: [
          { postId: +postId },
          { userId },
        ],
      },
    });
    if (data) {
      res.status(204).send({
        message: 'Like removed Successfully',
      });
    } else {
      res.status(404).send({
        message:
          `No like found for post=${postId}, user=${userId}`,
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e,
      message:
        e.message || `Some error occurred while removing like for post=${postId}`,
    });
  }
};
