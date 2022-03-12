const mongoose = require("mongoose");
const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    timestamps: true,
  }
);
//Add videos
courseSchema.virtual("videos", {
  ref: "Video",
  localField: "_id",
  foreignField: "course",
});

//Add additional links
courseSchema.virtual("links", {
  ref: "Link",
  localField: "_id",
  foreignField: "course",
});

courseSchema.set("toObject", { virtuals: true });
courseSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Course", courseSchema);
