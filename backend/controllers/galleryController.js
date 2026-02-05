const Gallery = require("../models/Gallery");

exports.uploadImage = async (req, res) => {
  const img = new Gallery({
    imageUrl: `/uploads/${req.file.filename}`,
    category: req.body.category,
  });

  await img.save();

  res.json({ msg: "Image uploaded", img });
};

exports.getAllImages = async (req, res) => {
  const images = await Gallery.find().sort({ uploadedAt: -1 });
  res.json(images);
};
