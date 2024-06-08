export function calculateGeneralScore(Form) {
  let Score = {
    type: 2,
    opYear: 2.5,
    ssm: 2.5,
    prodType: 0.5,
    storeType: 0.5,
    inventory: 1,
    reference: 0.5,
    socMedia: 0.5,
  };

  let totalScore = 0;

  totalScore += Score.type * getScoreForType(Form.type);
  totalScore += Score.opYear * getScoreForOpYear(Form.opYear);
  totalScore += Score.ssm * (Form.ssm === true ? 6 : 0);
  totalScore += Score.prodType * (Form.prodType === "physical" ? 6 : 4);
  totalScore += Score.storeType * (Form.storeType === "physical" ? 6 : 4);
  totalScore += Score.inventory * (Form.inventory === true ? 6 : 4);
  totalScore += Score.reference * (Form.reference !== "" ? 6 : 4);
  totalScore += Score.socMedia * (Form.socMedia !== "" ? 6 : 4);
  totalScore += Form.paymentgateway === true ? 15 : 0;
  totalScore -= Form.litigation === true ? 15 : 0;

  totalScore = Math.ceil(
    Math.round((totalScore / Object.keys(Score).length) * 100) / 100
  );

  if (totalScore < 0) {
    totalScore = 0;
  } else if (totalScore > 10) {
    totalScore = 10;
  } else totalScore = totalScore;

  Form.Score = totalScore;

  console.log(Form);
}

function getScoreForType(type) {
  switch (type) {
    case "publicLimited":
      return 10;
    case "privateLimited":
      return 8;
    case "soleProprietor":
      return 6;
    case "ngo":
      return 4;
  }
}

function getScoreForOpYear(opYear) {
  if (opYear === 1) {
    return 2;
  } else if (opYear > 1 && opYear < 5) {
    return 3;
  } else {
    return 4;
  }
}
