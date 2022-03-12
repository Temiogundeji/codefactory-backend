const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Video", videoSchema);
