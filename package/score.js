export function calculateGeneralScore(Form) {
  let totalScore = 0;
  let multiplier = 0;

  if (Form.type === "publicLimited") {
    totalScore += 6;
  } else if (Form.type === "privateLimited") {
    totalScore += 5;
  } else if (Form.type === "soleProprietor") {
    totalScore += 4;
  } else if (Form.type === "ngo") {
    totalScore += 4;
  }

  if (Form.ssm && Form.opYear > 5) {
    multiplier = 1.5;
  } else if (Form.ssm && Form.opYear > 1 && Form.opYear <= 5) {
    multiplier = 1.2;
  } else if (Form.ssm && Form.opYear == 1) {
    multiplier = 1;
  } else {
    multiplier = 0;
  }

  totalScore += Form.paymentgateway ? 3 : 0;
  totalScore += Form.prodType === "physical" ? 0.5 : 0;
  totalScore += Form.storeType === "physical" ? 1 : 0;
  totalScore += Form.inventory ? 0.5 : 0;
  totalScore += Form.reference ? 0.5 : 0;
  totalScore += Form.socMedia ? 0.5 : 0;

  totalScore = Math.floor(totalScore * multiplier);

  if (totalScore > 10) {
    totalScore = 10;
  }

  totalScore += Form.litigation ? -3 : 0;

  if (totalScore < 0) {
    totalScore = 0;
  }

  Form.Score = totalScore;
}
