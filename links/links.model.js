const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const linksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    linkTexts: {
      type: String,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

linksSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Link", linksSchema);
