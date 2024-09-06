const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = class AiController {
  static async getWelcomingMsg(req, res, mext) {
    // Make sure to include these imports:
    // import { GoogleGenerativeAI } from "@google/generative-ai";
    const genAI = new GoogleGenerativeAI(process.env.g_api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { username } = req.user;

    const prompt = `Greet my user their username is ${username} for my social media apps called "Ymedia". And give them a fun fact about a social media or some advice on how to stay safe on the internet`;

    const result = await model.generateContent(prompt);
    console.dir(result.response);
    res.status(200).json({
      result: result.response.text(),
    });
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
