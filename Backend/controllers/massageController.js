import { Massages } from "../mongodb/models/massageModel.js";

const sendMassages = async (req, res) => {
  const { conversationId, sender, text } = req.body;
  if (!conversationId || !sender || !text) {
    return res.status(500).json({ error: "Required params are missing!" });
  }
  const newMassages = new Massages({
    conversationId,
    sender,
    text,
  });
  try {
    const data = await newMassages.save();
    if (data) {
      res.status(200).json({
        mesage: "Massage created successfully!",
        data: req.body,
      });
    }
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const getMassages = async (req, res) => {
  const { conversationId } = req.body;

  if (!conversationId) {
    return res.status(500).json({ error: "Conversation id is required!" });
  }
  try {
    const data = await Massages.find({
      conversationId,
    });
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

export { sendMassages, getMassages };
