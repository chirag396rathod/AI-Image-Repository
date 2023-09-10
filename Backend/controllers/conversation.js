import mongoose from "mongoose";
import { conversation } from "../mongodb/models/chatConversationModel.js";
import { User } from "../mongodb/models/userModel.js";
const ObjectId = mongoose.Types.ObjectId;

const conversationControler = async (req, res) => {
  const { senderId, reciverId } = req.body;
  const userId = req?.userToken?.id;

  const newConversation = new conversation({
    member: [senderId, reciverId],
    user_id: userId,
  });
  try {
    const data = await newConversation.save();
    res.status(200).json({
      mesage: "Convesation created successfully!",
      data,
    });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const getConversationControler = async (req, res) => {
  const userId = req?.userToken?.id;

  try {
    const data = await conversation.find({ member: { $in: [userId] } });
    const conversationData = Promise.all(
      data.map(async (member) => {
        const id = await member.member.find((member) => member !== userId);
        const data = await User.findById(id);

        const users = {
          name: data?.name,
          updatedAt: data?.updatedAt,
          coonversationId: member?._id,
          reciverId: id,
        };
        return users;
      })
    );
    res.status(200).json({
      mesage: "Successfully!",
      data: await conversationData,
    });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const getConversationUsers = async (req, res) => {
  const userId = req?.userToken?.id;
  try {
    const data = await User.aggregate([
      {
        $match: {
          _id: { $ne: new ObjectId(userId) }, // Exclude the currently logged-in user
        },
      },
      {
        $lookup: {
          from: "conversations",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [{ $toString: "$$userId" }, "$member"],
                },
              },
            },
          ],
          as: "userConversations",
        },
      },
      {
        $addFields: {
          isFriend: {
            $cond: {
              if: {
                $gt: [{ $size: "$userConversations" }, 0],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          userConversations: 0,
        },
      },
    ]);
    res.status(200).json({
      mesage: "Successfully!",
      data,
    });
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export {
  conversationControler,
  getConversationControler,
  getConversationUsers,
};
