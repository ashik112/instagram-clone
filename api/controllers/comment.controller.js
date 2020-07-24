const db = require('../models');

const Comment = db.comments;

// * Add comment
exports.create = async (req, res) => {
  let transaction;
  const { userId, content } = req.body;
  const { postId } = req.params;
  try {
    transaction = await db.sequelize.transaction();
    const data = await Comment.create({
      userId: +userId,
      postId: +postId,
      content,
    });
    data.dataValues.user = await data.getUser();
    await transaction.commit();
    res.send(data);
  } catch (e) {
    if (transaction) await transaction.rollback();
    res.status(500).send({
      error: e,
      message:
        e.message || 'Some error occurred while commenting.',
    });
  }
};

// * Update comment
exports.update = async (req, res) => {
  let transaction;
  const { content } = req.body;
  const { id } = req.params;
  try {
    transaction = await db.sequelize.transaction();
    const data = await Comment.update({
      content,
    }, {
      where: {
        id,
      },
    });
    data.dataValues.user = await data.getUser();
    await transaction.commit();
    res.send(data);
  } catch (e) {
    if (transaction) await transaction.rollback();
    res.status(500).send({
      error: e,
      message:
        e.message || 'Some error occurred while updating comment.',
    });
  }
};

// * Remove comment
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Comment.destroy({ where: { id } });
    if (data) {
      res.status(204).send({
        message: 'Comment removed Successfully',
      });
    } else {
      res.status(404).send({
        message:
          `No comment found for comment=${id}`,
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e,
      message:
        e.message || `Some error occurred while removing like for comment=${id}`,
    });
  }
};
