const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
      type: String,
      required: true,
      default: ''
    },
    contents: {
      type: String,
      required: true,
      default: ''
    },
    createdAt: {
      type:Date,
      default:Date.now
    },
    updatedAt: {
      type:Date
    }
  }, { timestamps: true });

PostSchema.methods("toJSON", ()=> {
  
});

module.exports = Post = mongoose.model("post", PostSchema);