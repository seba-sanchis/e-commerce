import { Schema, model, models } from "mongoose";

const ContentSchema = new Schema({
  title: String,
  subtitle: String,
  image: String,
  url: String,
  tag: String,
  lastUpdated: Date,
});

const Content = models.Content || model("Content", ContentSchema);

export default Content;
