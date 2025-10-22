const sanitizeAd = (ad) => {
  let imagePath = ad.imagePath;
  if (imagePath) {
    imagePath = imagePath.replace(/\\/g, "/");
  } else {
    imagePath = null;
  }

  return {
    _id: ad._id,
    name: ad.name,
    link: ad.link,
    isActive: ad.isActive,
    imagePath: imagePath,
    createdAt: ad.createdAt,
    updatedAt: ad.updatedAt,
  };
};

const sanitizeAds = (ads) => {
  return ads.map((ad) => sanitizeAd(ad));
};

module.exports = { sanitizeAd, sanitizeAds };
