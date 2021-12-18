const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const authorSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

authorSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

authorSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", authorSchema);
