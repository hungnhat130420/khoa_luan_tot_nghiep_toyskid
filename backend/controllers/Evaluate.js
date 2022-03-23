const Evaluate = require("../models/Evaluate");
const User = require("../models/User");
const ChangeStart = async (req, res, next) => {
  try {
    const evaluateID = req.params.evaluateID;
    const { oneStar, twoStar, threeStar, fourStar, fiveStar } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const foundEvaluate = await Evaluate.findOne({ evaluateID });
    if (!foundEvaluate)
      return res
        .status(403)
        .json({ error: { message: "Không tìm thấy sản phẩm!!!" } });
    const one = foundEvaluate.oneStar;
    const two = foundEvaluate.twoStar;
    const three = foundEvaluate.threeStar;
    const four = foundEvaluate.fourStar;
    const five = foundEvaluate.fiveStar;
    if (oneStar && !twoStar && !threeStar && !fourStar && !fiveStar) {
      if (one.includes(foundUser._id)) {
        one.remove(foundUser._id);
      } else {
        one.push(foundUser._id);
        two.remove(foundUser._id);
        three.remove(foundUser._id);
        four.remove(foundUser._id);
        five.remove(foundUser._id);
      }
    } else if (!oneStar && twoStar && !threeStar && !fourStar && !fiveStar) {
      if (two.includes(foundUser._id)) {
        two.remove(foundUser._id);
      } else {
        two.push(foundUser._id);
        one.remove(foundUser._id);
        three.remove(foundUser._id);
        four.remove(foundUser._id);
        five.remove(foundUser._id);
      }
    } else if (!oneStar && !twoStar && threeStar && !fourStar && !fiveStar) {
      if (three.includes(foundUser._id)) {
        three.remove(foundUser._id);
      } else {
        three.push(foundUser._id);
        one.remove(foundUser._id);
        two.remove(foundUser._id);
        four.remove(foundUser._id);
        five.remove(foundUser._id);
      }
    } else if (!oneStar && !twoStar && !threeStar && fourStar && !fiveStar) {
      if (four.includes(foundUser._id)) {
        four.remove(foundUser._id);
      } else {
        four.push(foundUser._id);
        one.remove(foundUser._id);
        two.remove(foundUser._id);
        three.remove(foundUser._id);
        five.remove(foundUser._id);
      }
    } else if (!oneStar && !twoStar && !threeStar && !fourStar && fiveStar) {
      if (five.includes(foundUser._id)) {
        five.remove(foundUser._id);
      } else {
        five.push(foundUser._id);
        one.remove(foundUser._id);
        two.remove(foundUser._id);
        three.remove(foundUser._id);
        four.remove(foundUser._id);
      }
    } else {
      return res.status(403).json({ error: { message: "ERROR!!!" } });
    }
    const total =
      one.length + two.length + three.length + four.length + five.length;
    if (total == 0) {
      await Evaluate.findByIdAndUpdate(evaluateID, {
        oneStar: one,
        twoStar: two,
        threeStar: three,
        fourStar: four,
        fiveStar: five,
        avgEvaluate: 0,
        totalCount: total,
      });
    } else {
      const avg =
        (one.length * 1 +
          two.length * 2 +
          three.length * 3 +
          four.length * 4 +
          five.length * 5) /
        total;
      await Evaluate.findByIdAndUpdate(evaluateID, {
        oneStar: one,
        twoStar: two,
        threeStar: three,
        fourStar: four,
        fiveStar: five,
        avgEvaluate: avg,
        totalCount: total,
      });
    }
    return res.json({
      success: true,
      message: "Change Evaluate Success!!!",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { ChangeStart };
