import { StatusCodes } from 'http-status-codes';
import { Client } from "@notionhq/client";
import dotenv from 'dotenv';
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID;
const saveEmail = async (req, res) => {
  const { email } = req.body;
  if(!email){
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Email is required" });
  }

  try {

    await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            Email: { title: [{ text: { content: email } }] },
        },
    });

    res.status(StatusCodes.CREATED).json({
      message: "Email saved successfully!" 
      });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          error: "Failed to save email" 
      });
    }
}

export {
  saveEmail,
}