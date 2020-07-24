const db = require('../models');

const Follow = db.follows;
const { Op } = db.Sequelize;

// * Follow user
exports.follow = async (req, res) => {
  let transaction;
  const { followingId, userId } = req.body;
  try {
    transaction = await db.sequelize.transaction();
    const data = await Follow.create({
      followerId: userId,
      userId: followingId,
    });
    await transaction.commit();
    res.send(data);
  } catch (e) {
    if (transaction) await transaction.rollback();
    res.status(500).send({
      error: e,
      message:
        e.message || 'Some error occurred while following.',
    });
  }
};

// * Unfollow user
exports.unfollow = async (req, res) => {
  const { userId, followingId } = req.body;
  try {
    const data = await Follow.destroy({
      where: {
        [Op.and]: [
          { followerId: userId },
          { userId: followingId },
        ],
      },
    });
    if (data) {
      res.status(200).send({
        message: 'Follow removed Successfully',
      });
    } else {
      res.status(404).send({
        message:
          `User does not have followingId=${followingId}`,
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e,
      message:
        e.message || `Some error occurred while removing follow for followingId=${followingId}`,
    });
  }
};
